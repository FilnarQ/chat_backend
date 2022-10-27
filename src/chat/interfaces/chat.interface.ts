import { Document } from 'mongoose';

export interface Chat extends Document {
    id: Number,
    messageCount: Number,
    members: Array<String>,
    messages: Array<{
            author: String,
            text: String,
            time: String
    }>
}