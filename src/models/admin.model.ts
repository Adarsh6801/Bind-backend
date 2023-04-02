import {Schema, model} from 'mongoose';

export interface Admin{
    id:string;
    email:string;
    password: string;
    name:string;
    phone:number;
    status:boolean;
    profilePhotoUrl:string;

}

export const AadminSchema = new Schema<Admin>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    status:{type:Boolean,default:true},
    profilePhotoUrl:{type:String},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const AdminModel = model<Admin>('admin', AadminSchema);