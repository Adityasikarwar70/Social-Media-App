import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        
    },
    profileimage:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.25iSkbJTm4F-Rq0g1JR8NgHaHa?rs=1&pid=ImgDetMain"

    },
    followers:{
        type:[String],
        default:[]
    },
    following:{
        type:[String],
        default:[]
    },
    bio:{
        type:String,
        default:" ",
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema)
export default User; 