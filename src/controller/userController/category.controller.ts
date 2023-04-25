import { RequestHandler } from "express";
import { ProgramModel } from "../../models/program.model";
import { CourseModel } from "../../models/course.model";


export const getProgramsById:RequestHandler= async (req,res)=>{
    try{
        const {program}=req.params
        await CourseModel.find({program:program})
        .then((data)=>{
            console.log(data,'dataa');
            if(data.length>0){
                res.send({status:true,data,msg:"This are the datas"})
            }else{
                res.send({status:false,msg:"Sorry we will add you soon"})
            }
            
        })
    }catch(error){
        console.log(error);
        
    }
}