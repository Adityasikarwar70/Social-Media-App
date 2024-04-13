import express from "express"
import { signup , login , logout ,followUnfollow } from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoutes.js";

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post('/follow/:id', protectRoute ,followUnfollow)

export default router