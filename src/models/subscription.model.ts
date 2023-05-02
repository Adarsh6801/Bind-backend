import mongoose, {ObjectId, Schema, model} from 'mongoose';

export interface Subscription{
    id:string;
    userId:ObjectId;
    amount: number;
    course:string;
    mentor:string;
}

export const SubscriptionSchema = new Schema<Subscription>({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true,ref: 'user'},
    amount: {type: Number},
    course: {type: String},
    mentor:{type:String, default:"pending"},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const SubscriptionModel = model<Subscription>('subscription', SubscriptionSchema);