import { Document } from 'mongoose';

export interface User extends Document {
    username: String,
    chats: Array<{
            id: Number,
            messages_seen: Number
    }>
}