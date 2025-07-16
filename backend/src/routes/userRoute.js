import Router from "express";
import { insertUsers, findUser } from "../controllers/users.js";
import { protectRoute } from "../middlewares/authorization.js";

const router = Router()

router.post("/users", protectRoute, insertUsers)
router.get("/user/find",protectRoute, findUser)

export default router