import express from "express"
import { getMessage, getConversations, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoutes.js";


const router = express.Router();

router.get("/conversations", protectRoute, getConversations);
router.get("/:otherUserId",protectRoute,getMessage )


router.post("/",protectRoute,sendMessage)


export default router