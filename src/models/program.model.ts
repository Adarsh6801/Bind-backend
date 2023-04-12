import mongoose, {ObjectId, Schema, model} from 'mongoose';

export interface Program{
    program:string;
    imageUrl:string;
}

export const ProgramSchema = new Schema<Program>({

    program:{type:String,required:true},
    imageUrl:{type:String,required:true},

}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const ProgramModel = model<Program>('program', ProgramSchema);