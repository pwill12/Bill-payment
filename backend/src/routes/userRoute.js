import Router from "express";
import { insertUsers, findUser, findReceivers, CreatePaystackCode, CreatePaystackAcct } from "../controllers/users.js";
import { protectRoute } from "../middlewares/authorization.js";

const router = Router()

router.post("/users", protectRoute, insertUsers)
router.get("/user/find",protectRoute, findUser)
router.get("/user/find/:receiver",protectRoute, findReceivers)
router.post("/user/customercode",protectRoute, CreatePaystackCode)
router.post("/user/createpaystack",protectRoute, CreatePaystackAcct)

export default router