import express from "express";
import dotenv from 'dotenv';
import { mongoose } from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from './routes/user.route.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database is connected");
    app.listen(PORT,()=> console.log(`server started on http://localhost:${PORT}`));

}).catch((error)=>{
console.log("something went wrong in database connection" , error);
})


app.use('/api/users', userRoutes);
