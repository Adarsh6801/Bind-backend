import express from "express";

import * as userController from "../../controller/adminController/user.controller";
import * as mentorController from "../../controller/adminController/mentor.controller";
import * as programController from "../../controller/adminController/program.category.controller";
import * as languageController from "../../controller/adminController/language.controller";
import * as mentorSubscriptionController from "../../controller/adminController/mentor-subscription.controller";
import * as courseController from "../../controller/adminController/course.controller";
import { authCheck } from "../../middleware/auth.middleware";

const router = express.Router();

// get all users
router.get("/user/get-all-users", userController.getUsers);
router.get("/user/block/:id", userController.blockUser);
router.get("/user/unblock/:id", userController.unblockUser);
router.get("/user/single-user/:id", userController.singleUser);

// get all mentors
router.get("/mentor/get-all-mentors", authCheck, mentorController.getMentors);
router.get("/mentor/block/:id", mentorController.blockMentor);
router.get("/mentor/unblock/:id", mentorController.unblockMentor);
router.get("/mentor/remove-mentor/:roleid", mentorController.removeMentor);
router.get("/mentor/mentor-requests", mentorController.requestsForMentor);
router.get(
  "/mentor/mentor-request-accept/:roleid",
  mentorController.acceptRequestForMentor
);
router.get(
  "/mentor/mentor-request-decline/:roleid",
  mentorController.declineRequestForMentor
);

//  Program
router.get("/get-all-program", programController.getAllProgram);
router.post("/add-program", programController.addCategory);
router.get("/remove-program/:id", programController.deleteCategory);

//  Language
router.get("/get-all-language", languageController.getAllLanguage);
router.post("/add-language", languageController.addLanguage);
router.get("/remove-language/:id", languageController.deleteLanguage);

// Course
router.get("/get-all-course", courseController.getAllCourses);
router.post("/add-course", courseController.addCourse);
router.post("/add-topic", courseController.addTopics);
router.get("/delete-course/:id", courseController.deleteCourse);
router.get("/edit-course/:id",courseController.getEditCourse);
router.post("/edit-course",courseController.editCourse);

//Mentor subscription
router.get(
  "/mentor-subscription/get-all-mentor-subscriptors",
  mentorSubscriptionController.getAllMentorSubscripters
);
export default router;
