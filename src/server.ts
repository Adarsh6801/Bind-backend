import express from "express";

import cors from "cors";
import dotenv from "dotenv"
dotenv.config({path:"../.env"})
const app=express();
import { dbConnect } from "./configs/database.config";
dbConnect()

const PORT=process.env.PORT
console.log(PORT);

/*connecting the cors*/

app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.get('/',(req,res)=>{
    res.send("hello");
});

app.listen(PORT,()=>{
    console.log(`Server is connected to the PORT: ${PORT}`);
    
})