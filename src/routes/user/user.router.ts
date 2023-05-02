import express from "express";

import * as AuthController from "../../controller/userController/auth.controller";
import * as CategoryController from "../../controller/userController/category.controller";
import * as CourseController from "../../controller/userController/course.controller";
import * as SubscriptionController from "../../controller/userController/subscription.controller"
import * as ProfileController from "../../controller/userController/profile.controller"
import { authCheck } from "../../middleware/auth.middleware";
import { currentCourseCheck } from "../../middleware/currentCourse.middleware";

const router = express.Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.post("/auth/email-verify", AuthController.emailOtp);
router.get("/auth/otp-expires", AuthController.otpExpire);
router.get("/auth/email-resend", AuthController.resendOtp);
router.post("/auth/social-login", AuthController.socialLogin);
router.get("/auth/middlewarecheck", authCheck);

router.get("/program/:program", authCheck, CategoryController.getProgramsById);
router.get(
  "/course-view/:id",
  authCheck,
  currentCourseCheck,
  CourseController.getCourseById
);
router.get(
  "/get-course-without-mentor/:id",
  authCheck,
  CourseController.getCourseWithoutMentor
);
router.get("/checking-user-current-course", authCheck, currentCourseCheck);

router.get("/get-user", authCheck, CourseController.getUser);

router.get(
  "/get-current-course",
  authCheck,
  CourseController.userCurrentCourse
);
router.get("/get-course-with-mentor/:id",authCheck,CourseController.getCourseWithMentor)
router.get(
  "/exit-course",
  authCheck,
  CourseController.exitCourse
)
router.post('/mentor-subscription',authCheck,SubscriptionController.subscriptionPayment)
router.post ('/capture',authCheck,SubscriptionController.captureSubscription)

router.get('/get-user-courses',authCheck,CourseController.getUserCourses)
router.post('/update-photo',authCheck,CourseController.updateProfilePhoto)
router.post('/update-user',authCheck,CourseController.updateUser)

router.get('/request-for-mentor',authCheck,CourseController.requestForMentor)
router.get('/all-activities',authCheck,ProfileController.allActivities)
router.get('/remove-activiti/:id',authCheck,ProfileController.removeActivities)
export default router;
