import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'

const protectRoute = async(req, res,next)=>{
    try {
        const token = req.cookies.Auth;
        if(!token) return res.status(404).json({message:"Unauthorized"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select("-password");
        req.user =user;
        next();
    } catch (error) {
        res.status(404).json({message:error.message})
        console.log("User protect error");
    }
}
export default protectRoute;