import { RequestHandler } from "express";
import { UserModel } from "../../models/user.model";
import { RoleModel } from "../../models/role.model";

// get all Mentors
export const getMentors: RequestHandler = async (req, res) => {
  try {
    await RoleModel.find({ role: "mentor" })
      .populate("userId")
      .then((userId: any) => {
        res.status(200).send({ status: true, error: "all mentors", userId });
      });
  } catch (err) {}
};

// Block Mentors
export const blockMentor: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id id id ");
    await UserModel.findOneAndUpdate({ _id: id }, { $set: { status: false } })
    .then((mentor)=>{
      const name=mentor?.name
      res.status(200).json({ status: true,msg:`Mentor ${name} is Blocked` });
    })
    res.status(200).json({ status: true });
  } catch (error) {
    console.log(error);
  }
};

//Un-block mentor
export const unblockMentor: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id id id ");
    await UserModel.findOneAndUpdate({ _id: id }, { $set: { status: true } })
    .then((mentor)=>{
      const name=mentor?.name
      res.status(200).json({ status: true,msg:`Mentor ${name} is Unblocked` });
    })

  } catch (error) {
    console.log(error);
  }
};

//remove from mentor
export const removeMentor:RequestHandler=async (req,res)=>{
    try{
        const {roleid}=req.params;
        await RoleModel.findByIdAndUpdate(
            {_id:roleid},
            {$set:{isMentor:false,role:"user"}}
            )
            .then((mentor)=>{
                res
                .status(200)
                .send({ status: true, msg: "User removed from mentor" });
            })
    }catch(error){

    }
}

// Show all the users for mentor requests
export const requestsForMentor: RequestHandler = async (req, res) => {
  try {
    await RoleModel.find({ isRequestedForMentor: true })
      .populate("userId")
      .then((user: any) => {
        res
          .status(200)
          .send({ status: true, msg: "all request mentors", user });
      });
  } catch (error) {
    console.log(error);
  }
};

// Accept the Mentor reques
export const acceptRequestForMentor: RequestHandler = async (req, res) => {
  try {
    const { roleid } = req.params;
    await RoleModel.findByIdAndUpdate(
      { _id: roleid },
      { $set: { isMentor: true, role: "mentor", isRequestedForMentor: false } }
    ).then((result) => {
      const user_role = result?.populate("userId").then((user) => {
        console.log(user.userId, "user user user user");
        const user_details = user.userId;
        res
          .status(200)
          .send({
            status: true,
            msg: `the user is changed in to mentor `,
            user_details,
          });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

//Decline the mentor request

export const declineRequestForMentor:RequestHandler=async (req,res)=>{
    try{
        const { roleid } = req.params;        
        const user= await RoleModel.findOne({_id:roleid}).populate('userId')
        console.log(user,'role role role');
        await RoleModel.findByIdAndUpdate(
            {_id:roleid},
            {$set:{isRequestedForMentor:false}}
        )
        await RoleModel.findByIdAndUpdate(
            {_id:roleid},
            {$inc:{declineNumber:1}}
        ).then(()=>{
            res
            .status(200)
          .send({
            status: true,
            msg: `the user decined from the mentor request`,
            user
          });

        })
    }
    catch(error){
        console.log(error);
    }
}