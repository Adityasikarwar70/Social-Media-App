import express from "express"
import { signup , login , logout ,followUnfollow, update ,getUserProfile } from "../controllers/user.controller.js";
import protectRoute from "../middlewares/protectRoutes.js";

const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post('/follow/:id', protectRoute ,followUnfollow)
router.put('/update/:id', protectRoute ,update)

router.get('/profile/:query', getUserProfile) // query is anything username or id

export default router