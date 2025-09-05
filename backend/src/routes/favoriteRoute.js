import express from "express";
import { protectRoute } from "../middlewares/authorization.js";
import { insertFavourite } from "../controllers/favourite.js";

const router = express.Router()

router.post("/addfavorite",protectRoute, insertFavourite)

export default router;