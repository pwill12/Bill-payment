import express from "express";
import { protectRoute } from "../middlewares/authorization.js";
import { findFavorite, insertFavourite } from "../controllers/favourite.js";

const router = express.Router()

router.post("/addfavorite",protectRoute, insertFavourite)
router.get("/getfavorite",protectRoute, findFavorite)


export default router;