import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
    id: Number,
    messageCount: Number,
    members: Array<String>,
    messages: Array<{
            author: String,
            text: String,
            time: String
    }>
})