import { Schema, models, model, Document } from "mongoose";

export interface ITag extends Document {
    name: string
    description: string
    questions: Schema.Types.ObjectId[]
    followers: Schema.Types.ObjectId[]
    createOn: Date
}

const TagSchema = new Schema({
    name: { type: String, required: true, unique: true }, 
    description: { type: String},
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }], 
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
    createOn: { type: Date, default: Date.now },
});

const Tag = models.Tag || model('Tag', TagSchema)

export default Tag