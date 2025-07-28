import express from "express";
import { transactions } from "../controllers/transactions.js";
import { protectRoute } from "../middlewares/authorization.js";

const router = express.Router()

router.post("/send",protectRoute, transactions)

export default router;