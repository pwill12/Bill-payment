import { getAuth } from "@clerk/express";
import "dotenv/config"
import { sqldb } from "../config/db.js";
import { Stripe } from 'stripe'

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
if (!STRIPE_PUBLISHABLE_KEY && !STRIPE_SECRET_KEY) {
    throw new Error("Missing PAYSTACK_SECRET Keys environment variable")
}

export const StripePublishableKey = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ message: "unauthorized" });
        const finduser = await sqldb`
            SELECT * FROM users WHERE clerk_id = ${userId}
            `;
        if (!finduser || finduser.length == 0) {
            return res.status(404).json({ message: "no user found" })
        }

        res.status(200).json(STRIPE_PUBLISHABLE_KEY)

    } catch (error) {
        res.status(500).json({ message: "something went wrong", error })
    }
}

export async function PaymentSheet(req, res) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ message: "unauthorized" });
        const finduser = await sqldb`
        SELECT * FROM users WHERE clerk_id = ${userId}
        `;
        if (!finduser || finduser.length == 0) {
            return res.status(404).json({ message: "no user found" })
        }
        const { amount } = req.body;

        if (!amount) {
            return res.status(404).json({ message: "amount required" })
        }

        if (!finduser[0].stripe_id) {
            const customer = await stripe.customers.create({
                name: `${finduser[0].firstname ?? ''} ${finduser[0].lastname ?? ''}`.trim(),
                email: finduser[0].email || undefined
            })

            if (!customer?.id) {
                return res.status(502).json({ message: "error creating stripe customer" })
            }

            await sqldb`UPDATE users SET stripe_id = ${customer.id} WHERE clerk_id = ${userId}`;
            finduser[0].stripe_id = customer.id;
        }
        const ephemeralKey = await stripe.ephemeralKeys.create({ customer: finduser[0].stripe_id }, { apiVersion: '2025-08-27.basil' })

        if (!ephemeralKey?.secret) {
            return res.status(502).json({ message: "error creating epheralKeys" })
        }

        console.log(ephemeralKey)

        const paymentIntent = await stripe.paymentIntents.create({
            amount: parseInt(amount),
            currency: 'usd',
            customer: finduser[0].stripe_id,
            automatic_payment_methods: {
                enabled: true
            }
        })

        if (!paymentIntent?.client_secret) {
            return res.status(502).json({ message: "error creating paymentIntent" })
        }

        console.log(paymentIntent)

        return res.status(200).json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: finduser[0].stripe_id,
            publishableKey: STRIPE_PUBLISHABLE_KEY
        })

    } catch (error) {
        res.status(500).json({ message: "something went wrong", error })
    }
}