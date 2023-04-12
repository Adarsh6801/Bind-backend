import { RequestHandler } from "express";
import { CourseModel } from "../../models/course.model";



// get all courses

export const getAllCourses:RequestHandler= async (req,res)=>{
    try{
        const course=await CourseModel.find()
        res
        .send({staus:true,course})
    }catch(error){

    }
}

//Add courses

export const addCourse:RequestHandler=async (req,res)=>{
    try{
        console.log(req.body,'this is request');
        const {title,description,imageUrl,videoUrl,program,language}=req.body;
       const existTitle=await CourseModel.findOne({courseName:title})
       if(existTitle){
        res
        .send({status:true,msg:`${title} is already exists`})
       }else{
        new CourseModel({
            courseName: title,
            discription: description,
            program: program,
            language:language,
            imageUrl:imageUrl,
            videoUrl:videoUrl
          })
          .save()
          .then((data)=>{
            console.log(data);
            res
            .send({status:true,msg:`${data.courseName} is added successfuly`})
          })
          .catch((error)=>{
            res
            .send({status:false,error})
          })
       }
        
       

    }catch(error){

    }
}

//Add Topics

export const addTopics:RequestHandler=async (req,res)=>{
    try{

    }catch(error){

    }
}




