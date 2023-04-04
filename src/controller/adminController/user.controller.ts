import { RequestHandler } from "express"
import { UserModel } from "../../models/user.model";
import { RoleModel } from "../../models/role.model";



export const getUsers:RequestHandler=async (req,res)=>{
    try{
        await RoleModel.find({role:"user"}).populate('userId')
        .then((userId:any)=>{
             res
            .status(200)
            .send({ status: true, msg: "list of the all request",userId });
        })
    }catch(err){
        console.log(err);
        
    }

}
export const blockUser:RequestHandler=async (req,res)=>{
    try{
        const {id}=req.query
        console.log(id,'id id id ');
        await UserModel.findOneAndUpdate(
            {_id:id},
            {$set:{status:false},
            
        })
        res.status(200).json({ status: true });
    }catch(error){
        console.log(error);
        
    }

}

export const unblockUser:RequestHandler=async (req,res)=>{
    try{
        const {id}=req.query
        console.log(id,'id id id ');
        await UserModel.findOneAndUpdate(
            {_id:id},
            {$set:{status:true},
        })
        res.status(200).json({ status: true });
    }catch(error){
        console.log(error);
    }
}

