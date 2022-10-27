import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: String,
    chats: Array<{
            id: Number,
            messages_seen: Number
    }>
})