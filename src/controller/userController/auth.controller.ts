import { RequestHandler } from "express";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

import { UserModel } from "../../models/user.model";
import { RoleModel } from "../../models/role.model";

//json webtoken creating function
const generateToken = (user: { _id: ObjectId; name: string }) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECREAT_KEY!, {
    expiresIn: "1h",
  });
};

const otpGeneration = () => {
  return parseInt(Math.random().toString().substr(2, 6));
};

let Genotp!:number;

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
      Genotp=otpGeneration()
      console.log(Genotp,"register");
      
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
    Genotp=otpGeneration()
    console.log(Genotp,'resend otp');
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
export const otpExpire: RequestHandler=async (req,res)=>{
  try{
    Genotp=otpGeneration()
    console.log(Genotp);
    res
    .status(200)
    .send({ status: false, msg: "The otp is expired resend the OTP" });
}
  catch(error){
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
              const token = generateToken(user);
              RoleModel.findOne({ userId: user._id }).then((role: any) => {
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


