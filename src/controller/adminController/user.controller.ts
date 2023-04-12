import { RequestHandler } from "express";
import { UserModel } from "../../models/user.model";
import { RoleModel } from "../../models/role.model";

export const getUsers: RequestHandler = async (req, res) => {
  try {
    await RoleModel.find({ role: "user" })
      .populate("userId")
      .then((userId: any) => {
        res
          .status(200)
          .send({ status: true, msg: "list of the all request", userId });
      });
  } catch (err) {
    console.log(err);
  }
};
export const blockUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id id id ");
    await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: { status: false } }
    ).then((user) => {
      const name = user?.name;
      res
        .status(200)
        .json({ status: true, isUnblocked: true, msg: `${name} is Blocked` });
    });
  } catch (error) {
    console.log(error);
  }
};

export const unblockUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id id id ");
    await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: { status: true } }
    ).then((user) => {
      const name = user?.name;
      res
        .status(200)
        .json({ status: true, isUnblocked: true, msg: `${name} is Unblocked` });
    });
  } catch (error) {
    console.log(error);
  }
};
export const singleUser: RequestHandler = async (req, res) => {
  try {
    console.log("hiiiii");
    const  roleid  = req.params.id;
    console.log(roleid, "role id ");
    await RoleModel.findById({ _id: roleid })
      .populate("userId")
      .then((user) => {
        console.log(user, "user usser");
        if (user?.isMentor) {
          res
            .status(200)
            .json({
              status: true,
              isMentor: true,
              msg: "the user is mentor",
              user,
            });
        } else {
          res
            .status(200)
            .json({
              status: true,
              isMentor: false,
              msg: "the user is mentor",
              user,
            });
        }
      });
  } catch (error) {
    console.log(error);
  }
};
