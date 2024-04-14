import express from "express"
import { createPost, deletePost, getFeedPost, getPost, likeUnlikePost, replyToPost } from "../controllers/post.controller.js";

import protectRoute from "../middlewares/protectRoutes.js";

const router = express.Router();

router.post("/create",protectRoute, createPost)
router.post("/like/:id",protectRoute, likeUnlikePost)
router.post("/reply/:id",protectRoute, replyToPost)


router.get("/:id",protectRoute, getFeedPost)
router.get("/feed", getPost)
router.delete("/:id", protectRoute,deletePost)

export default router