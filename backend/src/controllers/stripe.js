import { getAuth } from "@clerk/express";
import "dotenv/config"
import { sqldb } from "../config/db";

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
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

        if (!finduser[0].stripe_id && !finduser[0].ephemeralKey) {
            const customer = await stripe.customer.create({
                name: `${finduser[0].firstname ?? ''} ${finduser[0].lastname ?? ''}`,
                email: finduser[0].email
            })

            if (!customer) {
                return res.status(404).json({ message: "error creating stripe customer" })
            }
            const ephemeralKey = await stripe.ephemeralKeys.create({ customer: customer.id }, { apiVersion: '2025-08-27.basil' })

            if (!ephemeralKey.secret) {
                return res.status(404).json({ message: "error creating epheralKeys" })
            }
            await sqldb`UPDATE users SET stripe_id = ${customer.id} , ephemeralkey = ${ephemeralKey.secret} WHERE clerk_id = ${userId} RETURNING *`;
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                customer: customer.id
            })

            if (!paymentIntent) {
                return res.status(404).json({ message: "error creating paymentIntent"})
            }

            return res.status(200).json({
                paymentIntent: paymentIntent.client_secret,
                ephemeralKey: ephemeralKey.secret,
                customer: customer.id,
                publishableKey: STRIPE_PUBLISHABLE_KEY
            })
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            customer: finduser[0].stripe_id
        })

        return res.status(404).json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: finduser[0].ephemeralKey,
            customer: finduser[0].stripe_id,
            publishableKey: STRIPE_PUBLISHABLE_KEY
        })


    } catch (error) {
        res.status(500).json({ message: "something went wrong", error })
    }
}