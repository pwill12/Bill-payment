import express from "express";
import { transactions } from "../controllers/transactions.js";

const router = express.Router()

router.post("/transaction/:user_id", transactions)

export default router;