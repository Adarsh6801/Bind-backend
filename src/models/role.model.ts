import mongoose, {ObjectId, Schema, model} from 'mongoose';

export interface Role{
    id:string;
    userId:ObjectId;
    isAdmin: boolean;
    isMentor:boolean;
    isMentorSubscription:boolean;
    role:string;
    isRequestedForMentor:boolean;
    isCurrentCourse:boolean;
    declineNumber:number;
    isSubscriptionRequest:boolean;
    isMentorUsers:Array<{userId:ObjectId,name:string,profileUrl:string}>;
}

export const RoleSchema = new Schema<Role>({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true,ref: 'user'},
    isMentor: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    isMentorSubscription:{type:Boolean,default:false},
    role:{type:String,default:"user"},
    isRequestedForMentor:{type:Boolean,default:false},
    declineNumber:{type:Number,default:0},
    isSubscriptionRequest: {type: Boolean, default: false},
    isMentorUsers: [{userId:mongoose.Schema.Types.ObjectId, name:String,profileUrl:String}],
    isCurrentCourse:{type:Boolean,default:false}
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