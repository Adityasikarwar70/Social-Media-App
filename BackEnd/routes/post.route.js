import express from "express"
import { createPost, deletePost, getFeedPost, getPost, likeUnlikePost, replyToPost ,getUserPost } from "../controllers/post.controller.js";

import protectRoute from "../middlewares/protectRoutes.js";

const router = express.Router();

router.post("/create",protectRoute, createPost)
router.put("/like/:id",protectRoute, likeUnlikePost)
router.put("/reply/:id",protectRoute, replyToPost)



router.get("/feed",protectRoute,getFeedPost )
router.get("/:id",getPost )
router.get("/user/:username", getUserPost)
router.delete("/:id", protectRoute,deletePost)

export default router