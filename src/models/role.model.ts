import {Schema, model} from 'mongoose';

export interface Role{
    id:string;
    userId:string;
    isAdmin: boolean;
    isMentor:boolean;
    isMentorSubscription:boolean;
}

export const RoleSchema = new Schema<Role>({
    userId: {type: String, required: true},
    isMentor: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    isMentorSubscription:{type:Boolean,default:false}
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const RoleModel = model<Role>('role', RoleSchema);