import express from "express";
import { transactions } from "../controllers/transactions.js";

const router = express.Router()

router.post("/send", transactions)

export default router;