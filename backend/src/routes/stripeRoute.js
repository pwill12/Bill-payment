import express from "express";
import { protectRoute } from "../middlewares/authorization.js";
import { PaymentSheet, StripePublishableKey } from "../controllers/stripe.js";

const router = express.Router()

router.get("/stripe",protectRoute, StripePublishableKey)
router.get("/payment-sheet",protectRoute, PaymentSheet)

export default router;