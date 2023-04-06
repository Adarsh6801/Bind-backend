import express from "express"

import * as userController from "../../controller/adminController/user.controller"
import * as mentorController from "../../controller/adminController/mentor.controller"


const router=express.Router()

// get all users
router.get('/user/get-all-users',userController.getUsers);
router.get('/user/block/:id',userController.blockUser);
router.get('/user/unblock/:id',userController.unblockUser);


// get all mentors
router.get('/mentor/get-all-mentors',mentorController.getMentors);
router.get('/mentor/block/:id',mentorController.blockMentor);
router.get('/mentor/unblock/:id',mentorController.unblockMentor);
router.get('/mentor/remove-mentor/:roleid',mentorController.removeMentor);
router.get('/mentor/mentor-requests',mentorController.requestsForMentor);
router.get('/mentor/mentor-request-accept/:roleid',mentorController.acceptRequestForMentor);
router.get('/mentor/mentor-request-decline/:roleid',mentorController.declineRequestForMentor);



export default router;