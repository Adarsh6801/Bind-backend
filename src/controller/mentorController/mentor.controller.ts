import { RequestHandler } from "express";
import { SubscriptionModel } from "../../models/subscription.model";
import { UserCourseModel } from "../../models/userCourse.model";
import { RoleModel } from "../../models/role.model";
import { UserModel } from "../../models/user.model";
import ActivityModel from "../../models/activity.model";
import { CourseProgressModel } from "../../models/courseprogress.model";

export const allRequestedUsers: RequestHandler = async (req, res) => {
  try {
    const requestedUsers = await SubscriptionModel.find({ mentor: "pending" }).populate('userId')
    res.send({ status: true, requestedUsers });
  } catch (error) {}
};

export const getAllMentorUsers: RequestHandler= async (req,res)=>{
  try{
    const payload = res.locals.payload;
    const userId = payload.userId;
    const users=await UserModel.find({currentMentor:userId})
    console.log(users,'this is the current users...');
    res.send({users,msg:"this is your users"})
  }catch(error){
    console.log(error);
    
  }
}

export const getUserMentor:RequestHandler=async (req,res)=>{
  try{
    const payload = res.locals.payload;
    const userId = payload.userId;
    const mentorName= await UserModel.findById({_id:userId})
    
    
    const {id}=req.params
    console.log(id,'idididididi');
    const user= await UserModel.findById({_id:id})
    const progressTable= await CourseProgressModel.findOne({userId:id})
    res.send({msg:"this is user",user,mentorName,progressTable})
  }catch(error){
    console.log(error);
  }
}

export const acceptUser: RequestHandler = async (req, res) => {
  try {
    let date = new Date();
    const { id } = req.params; //passing id is the request id
    console.log(id,'id id id ');
    
    const payload = res.locals.payload;
    const userId = payload.userId;
    console.log(userId,'userId');
    
    const mentor: any = await UserModel.findById({ _id: userId });
    console.log(mentor,',mentor');
  
    const subscription = await SubscriptionModel.findById({ _id: id });
    const activities=[{
      message:`${mentor.name} is your mentor for your ${subscription?.course}`,
      date:date,
      status:true,
    }]
    if (subscription) {
      console.log("hii");
      await RoleModel.findOneAndUpdate(
        { userId: subscription.userId },
        { $set: { isSubscriptionRequest: false,isMentorSubscription:true} }
      );
      await SubscriptionModel.findByIdAndUpdate(
        { _id: id },
        { $set: { mentor: mentor.name } }
      ).then((use)=>{
        console.log(use,'userrr');
        
      })
     const use= await UserModel.findByIdAndUpdate(
        { _id: subscription.userId },
        { $set: { currentMentor: userId } }
      );
      const userCourse = {
        courseName: subscription.course,
        date: date,
        isCompleted: false,
        activeCourse: true,
        days: 1,
      };
      const usercourse = await UserCourseModel.findOne({
        userId: subscription.userId,
      })
      console.log(usercourse,'usercourse');
      

      const activity= await ActivityModel.findOne({userId:subscription.userId})
      if(activity){
       await ActivityModel.findOneAndUpdate({userId:subscription.userId},{$push:{activity:activities}})
      }else{
       await  ActivityModel.create({
         userId:subscription.userId,
         activity:activities
       })
      }

      if (usercourse) {
        console.log("hii");

        await UserCourseModel.findOneAndUpdate(
          { userId: subscription.userId },
          { $push: { coursesOfUser: userCourse } }
        ).then(async (usercourse) => {
          console.log(usercourse, "usercourse");
          res.send({ status: true, msg:`you successfuly added the ${use?.name}` });
        });
      } else {
        console.log("helo");
        await new UserCourseModel({
          userId: subscription.userId,
          coursesOfUser: userCourse,
        })
          .save()
          .then((usercourse) => {
            console.log(usercourse, "user course");
            res.send({ status: true, msg:`you successfuly added the ${use?.name}` });
          });
      }
   

    }
  } catch (error) {
    console.log(error);
    
  }
};
