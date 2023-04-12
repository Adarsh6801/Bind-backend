import { Schema, model } from "mongoose";

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
}

export const UserSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    discription: { type: String },
    status: { type: Boolean, default: true },
    profilePhotoUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F49917726%2Fretrieving-default-image-all-url-profile-picture-from-facebook-graph-api&psig=AOvVaw0oweu2-NEYc7-mGn9PVvrl&ust=1680774665765000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJD0uNi7kv4CFQAAAAAdAAAAABAE",
    },
    loginType: { type: String, default: "Local" },
    currentCourse: { type: String },
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
