import { RequestHandler } from "express";
import { CourseModel } from "../../models/course.model";
import { ITopic, ITopics, TopicModel } from "../../models/topics.model";

var ptitle: any;
var pdescription: any;
var pprogram: any;
var planguage: any;
var pimageUrl: any;
var pvideoUrl: any;


var editId:any;

// get all courses

export const getAllCourses: RequestHandler = async (req, res) => {
  try {
    const course = await CourseModel.find();
    res.send({ staus: true, course });
  } catch (error) {
    console.log(error);
  }
};

//Add courses

export const addCourse: RequestHandler = async (req, res) => {
  try {
    console.log(req.body, "this is request");
    const { title, description, imageUrl, videoUrl, program, language } =
      req.body;
    const existTitle = await CourseModel.findOne({ courseName: title });
    if (existTitle) {
      res.send({ status: false, msg: `${title} is already exists` });
    } else {
      (ptitle = title),
        (pdescription = description),
        (pprogram = program),
        (planguage = language),
        (pimageUrl = imageUrl),
        (pvideoUrl = videoUrl);
        res.send({status:true,msg:`${title} is added successfuly Add the topics to the ${title}`})
    }
  } catch (error) {
    console.log(error);
  }
};

//delete course
export const deleteCourse: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await CourseModel.findByIdAndDelete({ _id: id }).then((course) => {
      if (course) {
        TopicModel.findByIdAndDelete({ _id: course.topic });
        res.send({status:true,msg:`${course.courseName} is deleted successfuly`})
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//edit course page
export const getEditCourse: RequestHandler = async (req,res)=>{
  try{

    const {id}=req.params;

   await CourseModel.findById({_id:id}).then((course)=>{
      if(course){
        editId=id
        console.log(editId,'edit course Id');
        res.send({status:true,msg:`The course is finded`,course})
      }else{
        res.send({status:false,msg:`There is something is happened`})
      }
    })
  }catch(error){
    console.log(error);
  }
}

// edit course

export const editCourse:RequestHandler=async (req,res)=>{
  try{
    const {title,description,language,program,videoUrl,imageUrl}=req.body
    console.log(req.body,'req.boduyyy');
    
console.log(editId,'edit id in the loop');
    await CourseModel.findByIdAndUpdate({_id:editId},{$set:{
      courseName:title,
      discription:description,
      language:language,
      program:program,
      videoUrl:videoUrl,
      imageUrl:imageUrl
    }})
    .then((course)=>{
      res.send({status:true,msg:`${title} is updated successfuly`})
    })

  }catch(error){
    console.log(error);
    
  }
}

//Add Topics

export const addTopics: RequestHandler = async (req, res) => {
  try {
    console.log(req.body,'request dot body');
    const topicsData: ITopics[] = req.body;     
    new CourseModel({
      courseName:ptitle,
      discription:pdescription,
      language:planguage,
      program:pprogram,
      imageUrl:pimageUrl,
      videoUrl:pvideoUrl
    })
    .save()
    .then(async (course:any)=>{
   const topics:any= await TopicModel.create(topicsData)
   await CourseModel.findByIdAndUpdate({_id:course._id},{$set:{
    topic:topics._id
   }})
   
   res.send({status:true,msg:`${ptitle} course topics added sucessfuly`})
    })
  } catch (error) {}
};
