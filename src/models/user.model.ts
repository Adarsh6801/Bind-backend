import mongoose, { ObjectId, Schema, model } from "mongoose";

export interface User {
  id: string;
  email: string;
  discription:string;
  password: string;
  name: string;
  address: string;
  phone: number;
  status: boolean;
  currentCourse: string;
  profilePhotoUrl: string;
  loginType: string;
  title:string;
  currentMentor:ObjectId;
  education:Array<{name:string}>
  skill:Array<{name:string}>
  experience:Array<{name:string}>

}

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    discription: { type: String },
    phone:{type:Number},
    currentCourse: { type: String },
    status: { type: Boolean, default: true },
    profilePhotoUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    loginType: { type: String, default: "Local" },
    title: { type: String, },
    currentMentor: {type: mongoose.Schema.Types.ObjectId,ref: 'user'},
    education: [{name:String}],
    skill: [{name:String}],
    experience: [{name:String}],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

export const UserModel = model<User>("user", UserSchema);
