import { RequestHandler } from "express";
import { ProgramModel } from "../../models/program.model";

const cloudinary = require('cloudinary').v2;


// all program

export const getAllProgram:RequestHandler= async (req,res)=>{
    try{
        const lang=await ProgramModel.find()
        console.log(lang,'lang');
        res
        .send({staus:true,lang})
    }catch(error){
        console.log(error);
        
    }
}



//add Program
export const addCategory: RequestHandler = async (req, res) => {
    try {
      console.log(req.body);
      const program=req.body.program
      const ImageUrl=req.body.imageUrl
      
        console.log(program);
        const existProgram=await ProgramModel.findOne({program:program})
        if(existProgram){
            res
            .send({status:false,msg:`the ${program} program is Already finds`})
        }
        else{
            await new ProgramModel({ program: program,imageUrl:ImageUrl })
            .save()
            .then((cat)=>{
                res
                .send({status:true,msg:`the ${cat.program} program is added`})
            })
        }
   
        

    } catch (err) {}
  };

  // delete Program
  export const deleteCategory:RequestHandler=async (req,res)=>{
    try{
        const {id}=req.params;
        console.log(id,'id id d ');
        
        await ProgramModel.findByIdAndDelete({_id:id})
        .then((program)=>{
            res
            .send({staus:true,msg:`The ${program?.program} is removed from the Program`})
        })
       

    }catch(error){

    }
  }

