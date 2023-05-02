import mongoose, {ObjectId, Schema, model} from 'mongoose';


export interface courseProgress{
    id:string;
    userId:string;
    courseId:ObjectId;
    courseProgress:Array<{
        topic:string,date:Date,star:number,pending:string,pass:string
}>;
}

export const CourseProgressSchema = new Schema<courseProgress>({
    userId: String,
    courseId: {type: mongoose.Schema.Types.ObjectId, required: true,ref: 'course'},
    courseProgress: [{topic:String, date:Date,star:Number,pending:String,pass:String}],
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