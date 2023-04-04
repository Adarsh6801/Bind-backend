import {Schema, model} from 'mongoose';

export interface User{
    id:string;
    email:string;
    password: string;
    name:string;
    address:string;
    phone:number;
    status:boolean;
    currentCourse:string;
    profilePhotoUrl:string;
    loginType:string;
    
}

export const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String},
    status:{type:Boolean,default:true},
    profilePhotoUrl:{type:String,default:`\BIND\bind-frontend\src\assets\images\default_image.png`},
    loginType:{type:String,default:"Local"}
    
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const UserModel = model<User>('user', UserSchema);