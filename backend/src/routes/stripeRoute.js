import express from "express";
import { protectRoute } from "../middlewares/authorization.js";
import { StripePublishableKey } from "../controllers/stripe.js";

const router = express.Router()

router.get("/stripe",protectRoute, StripePublishableKey)

export default router;