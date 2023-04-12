import mongoose, {ObjectId, Schema, model} from 'mongoose';

export interface Language{
    language:string;
    imageUrl:string;
}

export const LanguageSchema = new Schema<Language>({

    language:{type:String,required:true},
    imageUrl:{type:String,required:true}

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