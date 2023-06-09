import express from "express";
import dotenv from "dotenv"
dotenv.config({path:"../.env"})
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
const app=express();
app.use(bodyParser.json());

import { dbConnect } from "./configs/database.config";

import usersRouter from "./routes/user/user.router"
import adminRouter from "./routes/admin/admin.router"
import mentorRouter from "./routes/mentor/mentor.router"

const storage = multer.memoryStorage();
const upload = multer({ storage });

dbConnect()


const PORT=process.env.PORT
console.log(PORT);

/*connecting the cors*/

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));
app.use(express.json())
app.use('/user',usersRouter);
app.use('/admin',adminRouter);
app.use('/mentor',mentorRouter);


app.listen(PORT,()=>{
    console.log(`Server is connected to the PORT: ${PORT}`);
    
})