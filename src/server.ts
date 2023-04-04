import express from "express";

import dotenv from "dotenv"
dotenv.config({path:"../.env"})
import cors from "cors";
const app=express();

import { dbConnect } from "./configs/database.config";

import usersRouter from "./routes/user/user.router"
import adminRouter from "./routes/admin/admin.router"

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
app.use('/admin',adminRouter)


app.listen(PORT,()=>{
    console.log(`Server is connected to the PORT: ${PORT}`);
    
})