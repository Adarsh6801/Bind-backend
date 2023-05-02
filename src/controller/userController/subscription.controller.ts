import { RequestHandler } from "express";
import Razorpay from "razorpay";
import { RoleModel } from "../../models/role.model";
import { UserModel } from "../../models/user.model";
import { UserCourseModel } from "../../models/userCourse.model";
import { SubscriptionModel } from "../../models/subscription.model";


export const subscriptionPayment: RequestHandler = async (req, res) => {
    try {
        const payload = res.locals.payload;
        const userId = payload.userId;
        const form=req.body
        console.log(form,'form and ');
        if(form.saveInfo){
            await UserModel.findById({_id:userId},{$set:{address:`${form.data.address} ${form.data.city} ${form.data.postcode}`}})
        }
        const RazorpayConfig={
            key_id:"rzp_test_gAJDEjn0BI0746",
            key_secret:"fMqfXSiRYqesaC50plcPrXrZ"
        }
        var options = {
            amount: 500*100 , // amount in the smallest currency unit
            currency: "INR",
            receipt: "",
        };
        var instance = new Razorpay(RazorpayConfig)
        
        instance.orders.create(options, function (err, order) {
        
            return res.json(order);
        });
        
    } catch (error) {
  
    }
  };

  export const captureSubscription : RequestHandler = async  (req,res)=>{
    try{
        let date = new Date()
      
        console.log(req.body,'req body is important');
        const course =req.body.course;
        const userCourse = {
            courseName: course.courseName,
            date: date,
            isCompleted: false,
            activeCourse: true,
            days: 1,
          };
        const payload = res.locals.payload;
        const userId = payload.userId;
        console.log(userId,'user id ');
        await RoleModel.findOneAndUpdate({userId:userId},{$set:{isSubscriptionRequest:true,isCurrentCourse:true}})
        .then(async (user)=>{
            console.log("hellooo");
            await new SubscriptionModel({
                userId:userId,
                amout:req.body.amount,
                course:course.courseName,
              })
              .save()
              console.log("Hiiiiissisisisisisisi....");
              
        await UserCourseModel.findOneAndUpdate({userId:userId},{$push:{coursesOfUser:userCourse}})
            await UserModel.findByIdAndUpdate({_id:userId},{$set:{currentCourse:course.courseName}})
            console.log(req.body.amount,"amount------------");
            console.log(course.courseName,"course Name--------");
            console.log(userId,'user id id ');
  
                res.send({status:true,msg:`You have succesfully completed the subscription process ${course.courseName}`})
            
           
        })
    }catch(error){

    }
  }