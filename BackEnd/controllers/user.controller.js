import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import generateToken from "../utils/helpers/generateToken.js";

//signup user
export const signup = async(req,res)=>{
    try {
        const {name, username,email,password} = req.body;
        const user = await User.findOne({$or:[{email},{username}]}); 

        if(user) res.status(400).json({message:"User Already Exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            username,
            email,
            password:hashedPassword,
        });
        await newUser.save();

        if(newUser){
            generateToken(newUser._id,res)
            res.status(201).json(newUser)
        }
        
    } catch (error) {
        res.status(404).json({message:error.message})
    }

}

// signin user
export const login= async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || " ");

        if(!user || !isPasswordCorrect) res.status(400).json({message:"Invalid Username or Password"});

        generateToken(user._id,res);
        
        res.status(200).json({
            _id:user._id,
            name:user.name,
            username:user.username,
            email:user.email
        })

        
    } catch (error) {
        res.status(404).json({message:error.message})
        console.log("User Login error");

    }
}

// logout user
export const logout = async(req,res)=>{
    try {
        res.cookie("Auth","",{maxAge:1});
        res.status(200).json({message : "User loggedOut Successfully"})
    } catch (error) {
        res.status(404).json({message:error.message})
        console.log("User Login error");
    }
}

export const followUnfollow = async(req,res)=>{
    try {
        const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString())
			return res.status(400).json({ message: "You cannot follow/unfollow yourself" });

		if (!userToModify || !currentUser) return res.status(400).json({ message: "User not found" });

		const isFollowing = currentUser.following.includes(id);

		if (isFollowing) {
			// Unfollow user
			await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			// Follow user
			await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
			await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
			res.status(200).json({ message: "User followed successfully" });
		}
 
    } catch (error) {
        res.status(404).json({message:error.message})
        console.log("User Login error");
    }
}