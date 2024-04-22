import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import {v2 as cloudinary} from "cloudinary"

export const createPost = async (req, res) => {
  try {
    const { postedBy, text} = req.body;
    let{image} = req.body;

    if (!postedBy || !text)
      return res
        .status(400)
        .json({ message: "PostedBy and Text fields are requires" });

    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user._id.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Unauthorized to create posts" });

    const maxLength = 500;
    if (text.lenght > maxLength)
      return res
        .status(400)
        .json({ error: `Text must be less then ${maxLength} ` });
     
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      image = uploadResponse.secure_url;

    }

    const post = new Post({ postedBy, text, image });
    await post.save();

    return res.status(201).json({ message: "Post created Successfully", post });
  } catch (err) {
    res.status(404).json({ error: err.message });
    console.log("post create error");
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    return res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
    console.log("post get error");
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.postedBy.toString() !== req.user._id.toString())
      res.status(401).json({ error: "Unauthorized to delete the post" });

    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: err.message });
    console.log("post delete error");
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const post = await Post.findById(id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      // for unlike the post
      await Post.updateOne({ _id: id }, { $pull: { likes: userId } });
      res.status(200).json({ message: "post unliked successfully" });
    } else {
      // for like the post
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "post liked successfully" });
    }
  } catch (err) {
    res.status(404).json({ error: err.message });
    console.log("post like error");
  }
};

export const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params;
    const userId = req.user._id;
    const userProfilePic = req.user.profileimage;
    const username = req.user.username;

    if (!text) res.status(400).json({ error: "Text field is required" });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const reply = { userId, text, username, userProfilePic };
    post.replies.push(reply);
    await post.save();

    res.status(200).json({ message: "Reply added successfully", post });
  } catch (err) {
    res.status(404).json({ error: err.message });
    console.log("post reply error");
  }
};

export const getFeedPost = async (req, res) => {

    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "user not found" });

        const following = user.following;
        const feedPosts = await Post.find({postedBy:{$in:following}}).sort({createdAt:-1})
        res.status(200).json(feedPosts)
    } catch (err) {
        res.status(404).json({ error: err.message });
    console.log("post feed error");
    }
}