import { RequestHandler } from "express";
import { UserModel } from "../models/user.model";
import {RoleModel} from "../models/role.model"
import { CourseModel } from "../models/course.model";

export const currentCourseCheck:RequestHandler = async(req,res,next)=>{
   const payload=res.locals.payload
   const userId=payload.userId
   const {id}=req.params

   await RoleModel.findOne({userId:userId})
   .then(async (role)=>{
    if(role?.isCurrentCourse){
next();
    }else{
        await CourseModel.findById({_id:id}).populate('topic')
        .then((course)=>{
            return res.status(200).send({msg:"User have no current courses",currentCourse:false,course})
        })
    }
   })
   
}