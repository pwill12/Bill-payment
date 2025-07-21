import Router from "express";
import { insertUsers, findUser, findReceivers } from "../controllers/users.js";
import { protectRoute } from "../middlewares/authorization.js";

const router = Router()

router.post("/users", protectRoute, insertUsers)
router.get("/user/find",protectRoute, findUser)
router.get("/user/find/:receiver", findReceivers)


export default router