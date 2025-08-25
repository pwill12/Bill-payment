import Router from "express";
import { insertUsers, findUser, findReceivers, CreatePaystackCode, CreatePaystackAcct, UpdateUsers, Webhookpaystack, ValidateCustomer } from "../controllers/users.js";
import { protectRoute } from "../middlewares/authorization.js";

const router = Router()
const { raw } = require('express');


router.post("/users", protectRoute, insertUsers)
router.get("/user/find", protectRoute, findUser)
router.get("/user/find/:receiver", protectRoute, findReceivers)
router.put("/user/update", protectRoute, UpdateUsers)
router.post("/user/customercode", protectRoute, CreatePaystackCode)
router.post("/paystack-webhook", raw({ type: 'application/json' }),Webhookpaystack)
router.post("/user/createpaystack", protectRoute, CreatePaystackAcct)
router.post("/user/validatepaystack", protectRoute, ValidateCustomer)

export default router