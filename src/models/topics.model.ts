import mongoose, {ObjectId, Schema, model} from 'mongoose';

export interface Language{
    courseId:ObjectId;
    topicDiscription:Array<{heading:string,discription:string}>;
    image:string;
}

export const LanguageSchema = new Schema<Language>({

    courseId: {type: mongoose.Schema.Types.ObjectId, required: true,ref: 'course'},

    image:{type:String,required:true},
    topicDiscription: [{heading:String, discription:String}],

}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const LangugeModel = model<Language>('language', LanguageSchema);