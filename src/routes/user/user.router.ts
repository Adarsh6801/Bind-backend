import express from "express"

import * as AuthController from "../../controller/userController/auth.controller"


const router=express.Router()

router.post("/auth/register",AuthController.register);
router.post("/auth/login",AuthController.login);
router.post('/auth/email-verify',AuthController.emailOtp);
router.get('/auth/otp-expires',AuthController.otpExpire);
router.get('/auth/email-resend',AuthController.resendOtp);

export default router;