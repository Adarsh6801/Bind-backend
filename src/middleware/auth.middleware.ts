import { RequestHandler, json } from "express";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode"

export const authCheck:RequestHandler=async (req,res,next)=>{
    console.log(req.headers,"HIIIII");
    
    if(!req.headers.authorization){
        return res.status(401).send('Un authorised request')
    }
    let token =req.headers.authorization.split(' ')[1]
    console.log(token,'token...');
    
    if(token===null){
        return res.status(401).send('Un authorised request')
    }
    // let payload= jwt.verify(JSON.parse(token),process.env.JWT_SECREAT_KEY!)
    let payload= jwt_decode(token)
   
    
    if(!payload){
        return res.status(401).send('Un authorised request')
    }
    console.log(payload,'payload.....');
    
    res.locals.payload=payload
    next();
}