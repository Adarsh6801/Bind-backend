import { RequestHandler, json } from "express";
import jwt from "jsonwebtoken";

export const authCheck:RequestHandler=async (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send('Un authorised request')
    }
    let token =req.headers.authorization.split(' ')[1]
    if(token===null){
        return res.status(401).send('Un authorised request')
    }
    let payload= jwt.verify(JSON.parse(token),process.env.JWT_SECREAT_KEY!)
    if(!payload){
        return res.status(401).send('Un authorised request')
    }
    console.log(payload,'payload.....');
    
    res.locals.payload=payload
}