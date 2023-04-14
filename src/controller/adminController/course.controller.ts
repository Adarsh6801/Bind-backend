import { RequestHandler } from "express";
import { CourseModel } from "../../models/course.model";
import { ITopic, ITopics, TopicModel } from "../../models/topics.model";

var ptitle: any;
var pdescription: any;
var pprogram: any;
var planguage: any;
var pimageUrl: any;
var pvideoUrl: any;

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
      }
    });
  } catch (error) {
    console.log(error);
  }
};

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
   
      
    })
  } catch (error) {}
};
