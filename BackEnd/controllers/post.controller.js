import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost=async (req,res)=>{
    try {
        const {postedBy , text , image} = req.body;

        if(!postedBy || !text) return res.status(400).json({message:"PostedBy and Text fields are requires"});

        const user = await User.findById(postedBy);
        if(!user) return res.status(404).json({message:"User not found"});

        if(user._id.toString() !== req.user._id.toString() ) return res.status(401).json({message:"Unauthorized to create posts"});

        const maxLength = 500;
        if(text.lenght > maxLength) return res.status(400).json({message:`Text must be less then ${maxLength} `});

        const post = new Post({postedBy ,text,image});
        await post.save();

        return res.status(201).json({message:"Post created Successfully" , post});
        
    } catch (error) {
        res.status(404).json({message:error.message})
        console.log("post create error");
    }
}