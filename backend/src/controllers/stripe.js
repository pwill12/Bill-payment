import { getAuth } from "@clerk/express";
import "dotenv/config"

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY
if (!PAYSTACK_SECRET) {
    throw new Error("Missing PAYSTACK_SECRET environment variable")
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
        res.status(500).json({message: "something went wrong", error})
    }
}