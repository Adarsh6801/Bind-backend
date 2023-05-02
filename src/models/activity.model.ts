import mongoose from 'mongoose';

export interface Activity {
  date: Date;
  message: string;
  status:boolean;
}

interface ActivityDocument extends mongoose.Document {
  userId: string;
  activity: Activity[];
}

const activitySchema = new mongoose.Schema<ActivityDocument>({
  userId: {
    type: String,
    ref: 'user' // Refers to the User model
  },
  activity: [
    {
      date: {
        type: Date,
        required: true,
       
      },
      message: {
        type: String,
        required: true
      },
      status:{
        type:Boolean,
        
      }
    }
  ]
});

const ActivityModel = mongoose.model<ActivityDocument>('Activity', activitySchema);

export default ActivityModel;
