import { RequestHandler } from "express";
import { ObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserModel } from "../../models/user.model";
import { RoleModel } from "../../models/role.model";

//json webtoken creating function
const generateToken = (user: { _id: ObjectId; name: string }) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECREAT_KEY!, {
    expiresIn: "1h",
  });
};

//user register
export const register: RequestHandler = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      return res.status(200).send({ error: "Email already taken" });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      new UserModel({
        name: name,
        email: email,
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
    }
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
             
            });
        } else {
          res.status(200).send({ status: false, error: "user is now blocked" });
        }
      })
      .catch((error) => {
     
        res.status(404).send({ status: false, error: "Email not found" });
      });
  } catch (error) {
 console.log(error);
 
  }
};
