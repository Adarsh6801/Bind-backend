import mongoose, {ObjectId, Schema, model} from 'mongoose';

export interface ISubtopic extends Document {
    subtopic: string;
  }
  
  const subtopicSchema = new Schema<ISubtopic>({
    subtopic: { type: String },
  });
  
  // Schema for topic
  export interface ITopic extends Document {
    topic: string;
    discription: string;
    subtopics: ISubtopic[];
  }
  export interface ITopics extends Document {
    Courseid:ObjectId,
    topics:ITopic[]
  }
  
  const topicSchema = new Schema<ITopic>({
    topic: { type: String },
    discription: { type: String },
    subtopics: [subtopicSchema],
  }
  );

  const topicsSchema=new Schema<ITopics>({
    Courseid:{type:mongoose.Schema.Types.ObjectId,ref:'course'},
    topics:[topicSchema],
  },
  {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
}

  )
  


export const TopicModel = model<ITopics>('topic', topicsSchema);