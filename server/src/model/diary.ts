import { Schema, model, InferSchemaType, pluralize } from 'mongoose';
import mongoose from 'mongoose';
pluralize(null);



export const UserModel = model<User>('user', userSchema);

const diarySchema = new Schema({
    user_id: mongoose.Types.ObjectId,
    title: String,
    description: String,
}, {
    timestamps: true
})

export type Diary = InferSchemaType<typeof diarySchema>;

export const DiaryModel = model<Diary>('diary', diarySchema);
