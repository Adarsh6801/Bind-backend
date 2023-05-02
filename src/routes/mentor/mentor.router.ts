import express from "express";
import * as mentorController from "../../controller/mentorController/mentor.controller"
import * as progressTableController from "../../controller/mentorController/progressTable.controller"
import { authCheck } from "../../middleware/auth.middleware";

const router = express.Router();

router.get('/get-all-requested-users',mentorController.allRequestedUsers)
router.get('/accept-user/:id',authCheck, mentorController.acceptUser)
router.get('/get-mentor-users',authCheck,mentorController.getAllMentorUsers)
router.get('/get-user-mentor/:id',authCheck,mentorController.getUserMentor)
router.post('/upload-progress-table',authCheck,progressTableController.uploadProgressTable)
router.get('/get-progress-table/:id',authCheck,progressTableController.getProgressTable)


export default router;