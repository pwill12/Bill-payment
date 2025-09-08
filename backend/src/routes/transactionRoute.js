import express from "express";
import { findTransaction, getRecent, getTransactions, transactions } from "../controllers/transactions.js";
import { protectRoute } from "../middlewares/authorization.js";

const router = express.Router()

router.post("/send",protectRoute, transactions)
router.get("/transactions/:username",protectRoute, getTransactions)
router.get("/transaction/:id",protectRoute, findTransaction)
router.get("/recent-transaction",protectRoute, getRecent)

export default router;