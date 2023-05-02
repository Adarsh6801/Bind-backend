import { RequestHandler } from "express";
import { UserModel } from "../../models/user.model";
import { CourseModel } from "../../models/course.model";
import { CourseProgressModel } from "../../models/courseprogress.model";


export const uploadProgressTable:RequestHandler=async (req,res)=>{
    try{
        let date=new Date()
      console.log(req.body,'this is from progress table');
      const data=req.body.data
      const userId=req.body.id
     const user= await UserModel.findById({_id:userId})
     console.log(user,"user");
     const course=await CourseModel.findOne({courseName:user?.currentCourse})
     console.log(course,"course");
     const courseProgress={
        topic:data.topic,
        date:date,
        star:data.mark,
        pending:data.pendingTopics,
        pass:data.status
     }
     console.log(courseProgress,'courseProgress');
     if(course){
        const progressTable= await CourseProgressModel.findOne({userId:user?._id})
        console.log(progressTable,'progressTable');
        if(progressTable){
            await CourseProgressModel.findOneAndUpdate({userId:user?.id},{$push:{courseProgress:courseProgress}})
            .then(()=>{
                res.send({status:true,msg:`You added the topic`})
            })
        }else{
            await new CourseProgressModel({
                userId:user?._id,
                courseId:course._id,
                courseProgress:courseProgress
            })
            .save()
            .then(()=>{
                res.send({status:true,msg:`You added the topic`})
            })
        }
     }
     
     
    }catch(error){
      console.log(error);
    }
  }
  
  export const getProgressTable:RequestHandler=async (req,res)=>{
    try{
        const id=req.params.id
     const progressTable=await CourseProgressModel.findOne({userId:id})
     console.log(progressTable,'progressTable');
     res.send({status:true,progressTable})
    }catch(error){
      console.log(error);
    }
  }
  