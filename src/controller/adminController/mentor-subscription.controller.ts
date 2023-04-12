import { RequestHandler } from "express";
import { RoleModel } from "../../models/role.model";


export const getAllMentorSubscripters:RequestHandler=async (req,res)=>{
    await RoleModel.find({isMentorSubscription:true}).populate("userId")
    .then((user)=>{
        console.log(user,"userrr");
        res.status(200).send({ status: true, msg: "all mentor-subscripters", user });
        
    })
  }