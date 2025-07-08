import Router from "express";
import { insertUsers, findUser } from "../controllers/users.js";

const router = Router()

router.post("/users", insertUsers)
router.get("/users/:user_id", findUser)

export default router