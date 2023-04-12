import mongoose, {ObjectId, Schema, model} from 'mongoose';

export interface Course{
    language:ObjectId;
    program:ObjectId;
    courseName:string;
    discription:string;
    numberOfTopics:number;
    image:string;
    videoUrl:string;
}

export const CourseSchema = new Schema<Course>({

    language: {type: mongoose.Schema.Types.ObjectId, required: true,ref: 'language'},
    program: {type: mongoose.Schema.Types.ObjectId, required: true,ref: 'category'},
    courseName:{type:String,required:true},
    discription:{type:String,required:true},
    numberOfTopics:{type:Number,required:true},
    videoUrl:{type:String,required:true},
    image:{type:String,required:true}

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