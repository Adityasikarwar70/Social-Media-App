import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import generateToken from "../utils/helpers/generateToken.js";
import {v2 as cloudinary} from "cloudinary"

//signup user
export const signup = async(req,res)=>{
    try {
        const {name, username,email,password,mobile} = req.body;
        const user = await User.findOne({$or:[{email},{username}]}); 

        if(user) res.status(400).json({error:"User Already Exists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            username,
            email,
            mobile,
            password:hashedPassword,
        });
        await newUser.save();

        if(newUser){
            generateToken(newUser._id,res)

            res.status(201).json({
                _id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				username: newUser.username,
				mobile: newUser.mobile,
				bio: newUser.bio,
				profileimage: newUser.profileimage,
            })
        }else{
			res.status(400).json({ error: "Invalid user data" });
		}
        
    } catch (err) {
        res.status(404).json({error:err.message})
    }

}

// signin user
export const login= async(req,res)=>{
    try {
        const {username,password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || " ");

        if(!user || !isPasswordCorrect) res.status(400).json({error:"Invalid Username or Password"});

        generateToken(user._id,res);
        
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileimage:user.profileimage,
            mobile:user.mobile
        })

        
    } catch (err) {
        res.status(404).json({error:err.message})
        console.log("User Login error");

    }
}

// logout user
export const logout = async(req,res)=>{
    try {
        res.cookie("Auth","",{maxAge:1});
        res.status(200).json({message : "User loggedOut Successfully"})
    } catch (err) {
        res.status(404).json({error:err.message})
        console.log("User logout error");
    }
}

// to follow or unfollow user
export const followUnfollow = async(req,res)=>{
    try {
        const { id } = req.params;
		const userToModify = await User.findById(id);
		const currentUser = await User.findById(req.user._id);

		if (id === req.user._id.toString())
			return res.status(400).json({ error: "You cannot follow/unfollow yourself" });

		if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });

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
 
    } catch (err) {
        res.status(404).json({error:err.message})
       
    }
}

// to update user details
export const update = async(req,res)=>{
    const {name ,email,username,password,mobile,bio} = req.body;
    let {profileimage} = req.body;
    const userId = req.user._id
    try {
        let user = await User.findById(userId);
        if(!user) return res.status(400).json({error:"user not found"})

        if (req.params.id !== userId.toString())
			return res.status(400).json({ error: "You cannot udpate other user's profile" });

        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            user.password = hashedPassword;
        }
        if(profileimage){
            if(user.profileimage){
                await cloudinary.uploader.destroy(user.profileimage.split("/").pop().split(".")[0]);
            }
            const uploadResponse = await cloudinary.uploader.upload(profileimage);
            profileimage = uploadResponse.secure_url;
        }

        user.name = name || user.name
        user.email = email || user.email
        user.username = username || user.username
        user.mobile = mobile || user.mobile
        user.profileimage = profileimage || user.profileimage
        user.bio = bio || user.bio

        user= await user.save()
        user.password = null;
        res.status(200).json(user)
        

    } catch (err) {
        
        res.status(404).json({error:err.message})
        console.log("User Update error");
    }
}


// get the user details 
export const getUserProfile =async(req,res)=>{
    const {username} = req.params;
    try {
        const user = await User.findOne({username}).select("-password").select("-updatedAt");

        if(!user) return res.status(400).json({error:"User not found"});
        
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({error:err.message})
        console.log("User get profile error");
    }

}