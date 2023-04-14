import mongoose, {ObjectId, Schema, model} from 'mongoose';

export interface Course{
    language:string;
    program:string;
    courseName:string;
    discription:string;
    numberOfTopics:number;
    imageUrl:string;
    videoUrl:string;
    topic:ObjectId;
}

export const CourseSchema = new Schema<Course>({

    language: {type: String, required: true,ref: 'language'},
    program: {type: String, required: true,ref: 'category'},
    courseName:{type:String,required:true},
    discription:{type:String,required:true},
    numberOfTopics:{type:Number,},
    videoUrl:{type:String,required:true},
    imageUrl:{type:String,required:true},
    topic: {type: mongoose.Schema.Types.ObjectId,ref: 'topic'},

}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const CourseModel = model<Course>('course', CourseSchema);