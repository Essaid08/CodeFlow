import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
    clerkId: string
    name: string
    username: string
    email: string
    password?: string
    bio?: string
    picture: string
    location?: string
    portfolioWebsite?: string
    reputaion?: number
    saved: Schema.Types.ObjectId[]
    joinAt: Date
}

const UserSchema : Schema = new Schema({
    clerkId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, },
    bio: { type: String },
    picture: { type: String, required: true },
    location: { type: String },
    portfolioWebsite: { type: String },
    reputaion: { type: Number, default: 0 },
    saved: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    joinAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>('User', UserSchema)

export default User

