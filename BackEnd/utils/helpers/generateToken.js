import  jwt  from "jsonwebtoken";

const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'7d',
    })

    res.cookie("Auth",token,{
        httpOnly:true,
        maxAge:7*24*60*60*1000,
        sameSite:"strict",
    })
}

export default generateToken;