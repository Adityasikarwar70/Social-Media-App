import express from "express";
import dotenv from 'dotenv';
import { mongoose } from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


//middleWares
app.use(express.json()); // to parse JSON data in the req.body
app.use(express.urlencoded({extended:true})); //to parse form data in the req.body
app.use(cookieParser());


//connect mongoDB database
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database is connected");
    app.listen(PORT,()=> console.log(`server started on http://localhost:${PORT}`));

}).catch((error)=>{
console.log("something went wrong in database connection" , error);
})

// Routes 
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
