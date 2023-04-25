import mongoose, {ObjectId, Schema, model} from 'mongoose';


export interface courseProgress{
    id:string;
    userId:ObjectId;
    courseId:ObjectId;
    courseProgress:Array<{
        topic:number,date:Date,star:number,pending:string,pass:boolean
}>;
}

export const CourseProgressSchema = new Schema<courseProgress>({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true,ref: 'user'},
    courseId: {type: mongoose.Schema.Types.ObjectId, required: true,ref: 'course'},
    courseProgress: [{topic:Number, date:Date,star:Number,pending:String,pass:Boolean}],
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const CourseProgressModel = model<courseProgress>('courseprogress', CourseProgressSchema);