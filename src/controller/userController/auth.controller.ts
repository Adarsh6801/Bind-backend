import { RequestHandler } from "express";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";


import { UserModel } from "../../models/user.model";
import { RoleModel } from "../../models/role.model";
import { AdminModel } from "../../models/admin.model";

//json webtoken creating function
const generateToken = (user: { _id: ObjectId; name: string,role:string }) => {
  return jwt.sign({ userId: user._id,name:user.name,role:user.role }, process.env.JWT_SECREAT_KEY!, {
    expiresIn: "1h",
  });
};

const otpGeneration = () => {
  return parseInt(Math.random().toString().substr(2, 6));
};

let Genotp!: number;

var rname: any;
var rEmail: any;
var rPassword: any;

// otp

let mailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",

  auth: {
    user: process.env.EMAIL_OTP,
    pass: process.env.APP_PASSWORD_EMAIL,
  },
});

//user register
export const register: RequestHandler = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res
        .status(200)
        .send({ status: false, error: "Email already taken" });
    } else {
      rname = name;
      rEmail = email;
      rPassword = password;
      Genotp = otpGeneration();
      console.log(Genotp, "register");

      let details = {
        from: process.env.EMAIL_OTP,
        to: email,
        subject: "Otp for registration is: ",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          Genotp +
          "</h1>", // html body
      };
      mailTransport.sendMail(details, (err) => {
        if (err) {
          console.log(err);
          res.status(200).send({ status: false, error: err });
        } else {
          console.log("email is sent");
          res
            .status(200)
            .send({ status: true, email: true, msg: "email sent succesfuly" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//otp verification

export const emailOtp: RequestHandler = async (req, res) => {
  try {
    let otp = req.body.otp;
    otp = parseInt(otp);
    if (otp == Genotp) {
      if (rEmail) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(rPassword, salt);
        new UserModel({
          name: rname,
          email: rEmail,
          password: hashedPassword,
        })
          .save()
          .then((user: any) => {
            new RoleModel({
              userId: user._id,
            }).save();

            const token = generateToken(user);
            res.status(201).send({
              msg: "User Register Successfully",
              status: true,
              token,
              user: user._id,
            });
          })
          .catch((error) => res.status(200).send({ error, status: false }));
      } else {
        res.status(201).send({
          msg: "Your email is not getted go back to the register form",
          status: false,
        });
      }
    } else {
      res.status(201).send({
        msg: "You have entered the wrong otp",
        status: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//resend otp
export const resendOtp: RequestHandler = async (req, res) => {
  try {
    Genotp = otpGeneration();
    console.log(Genotp, "resend otp");
    let details = {
      from: process.env.EMAIL_OTP,
      to: rEmail,
      subject: "Otp for registration is: ",
      html:
        "<h3>OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        Genotp +
        "</h1>", // html body
    };
    mailTransport.sendMail(details, (err) => {
      if (err) {
        console.log(err);
        res.status(200).send({ status: false, error: err });
      } else {
        console.log("email is sent");
        res
          .status(200)
          .send({ status: true, email: true, msg: "email sent succesfuly" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// otp expires
export const otpExpire: RequestHandler = async (req, res) => {
  try {
    Genotp = otpGeneration();
    console.log(Genotp);
    res
      .status(200)
      .send({ status: false, msg: "The otp is expired resend the OTP" });
  } catch (error) {
    console.log(error);
  }
};

//user and mentor login
export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email })
      .then((user: any) => {
        if (user.status) {
          bcrypt
            .compare(password, user.password)
            .then((result) => {
              if (!result) {
                return res
                  .status(200)
                  .send({ status: false, error: "Password does not match" });
              }
              
              RoleModel.findOne({ userId: user._id }).then((role: any) => {
                const payload:any={
                  _id:user.id,
                  name:user.name,
                  role:role.role
                }                
                const token = generateToken(payload);
                return res.status(200).send({
                  msg: " Login Successful...!",
                  userName: user.name,
                  isMentor: role.isMentor,
                  isAdmin: role.isAdmin,
                  token,
                  status: true,
                });
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          res.status(200).send({ status: false, error: "user is now blocked" });
        }
      })
      .catch(() => {
        res.send({ status: false, error: "Email is not found" });
      });
  } catch (error) {
    console.log(error);
  }
};

//social Login

export const socialLogin: RequestHandler = async (req, res) => {
  try {
    const { name, email, profilePhotoUrl, loginType } = req.body;
    await UserModel.findOne({ email: email }).then(async (user) => {
      if (user) {        
        if (user.status) {
          await RoleModel.findOne({ userId: user._id }).then((data) => {
            if (data) {
              const payload:any={
                _id:user.id,
                name:user.name,
                role:data.role
              }  
              console.log(payload,'payload');
              
              let token=generateToken(payload)
              console.log(token,'token');
              res
                .status(200)
                .send({
                  status: true,
                  msg: "User Login successfully",
                  isMentor: data.isMentor,
                  token
                });
            }
          });
        } else {
          res.status(200).send({ status: false, error: "user is now blocked" });
        }
      } else {
        new UserModel({
          name: name,
          email: email,
          profilePhotoUrl: profilePhotoUrl,
          loginType: loginType,
          password: `this is ${loginType} login`,
        })
          .save()
          .then((user) => {
            new RoleModel({
              userId: user._id,
            }).save()
            .then((role)=>{
              const payload:any={
                _id:user.id,
                name:user.name,
                role:role.role
              }
              let token=generateToken(payload)
              console.log(token,'token');
              
              res.status(201).send({
                msg: "User Social Login Successfully",
                status: true,
                user: user._id,
                token
              });
            })
            
        
          });
      }
    });
  } catch (error) {}
};

//forgot password

export const forgotPassword:RequestHandler= async(req,res)=>{
  try{

  }catch(error){
    
  }
}
