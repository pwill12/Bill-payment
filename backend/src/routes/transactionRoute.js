import express from "express";
import { getTransactions, transactions } from "../controllers/transactions.js";
import { protectRoute } from "../middlewares/authorization.js";

const router = express.Router()

router.post("/send",protectRoute, transactions)
router.get("/transactions/:username",protectRoute, getTransactions)

export default router;