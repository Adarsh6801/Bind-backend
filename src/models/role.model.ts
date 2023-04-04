import mongoose, {ObjectId, Schema, model} from 'mongoose';

export interface Role{
    id:string;
    userId:ObjectId;
    isAdmin: boolean;
    isMentor:boolean;
    isMentorSubscription:boolean;
    role:string;
    isRequestedForMentor:boolean;
    declineNumber:number;
}

export const RoleSchema = new Schema<Role>({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true,ref: 'user'},
    isMentor: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    isMentorSubscription:{type:Boolean,default:false},
    role:{type:String,default:"user"},
    isRequestedForMentor:{type:Boolean,default:false},
    declineNumber:{type:Number,default:0}
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