import mongoose, {ObjectId, Schema, model} from 'mongoose';


export interface userCourse{
    id:string;
    userId:ObjectId;

    coursesOfUser:Array<{
        active: unknown;courseName:string,date:Date,isCompleted:boolean,activeCourse:boolean,days:number
}>;
}

export const UserCourseSchema = new Schema<userCourse>({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true,ref: 'user'},
    coursesOfUser: [{courseName:String, date:Date,isCompleted:Boolean,activeCourse:Boolean,days:Number}],

}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const UserCourseModel = model<userCourse>('usercourse', UserCourseSchema);