import express from "express"

import * as userController from "../../controller/adminController/user.controller"
import * as mentorController from "../../controller/adminController/mentor.controller"

const router=express.Router()

// get all users
router.get('/user/get-all-users',userController.getUsers);
router.patch('/user/block',userController.blockUser);
router.patch('/user/unblock',userController.unblockUser);


// get all mentors
router.get('/mentor/get-all-mentors',mentorController.getMentors);
router.patch('/mentor/block',mentorController.blockMentor);
router.patch('/mentor/unblock',mentorController.unblockMentor);
router.patch('/mentor/remove-mentor',mentorController.removeMentor)
router.get('/mentor/mentor-requests',mentorController.requestsForMentor);
router.patch('/mentor/mentor-request-accept',mentorController.acceptRequestForMentor);
router.patch('/mentor/mentor-request-decline',mentorController.declineRequestForMentor);



export default router;