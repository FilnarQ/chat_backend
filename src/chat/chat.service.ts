import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './interfaces/chat.interface';
import { User } from './interfaces/user.interface';
import { CreateChat } from './types/chat.type';
import { CreateUser } from './types/user.type';
import { SendMessage } from './types/message.type';

@Injectable()
export class ChatService {
    constructor(@InjectModel('Chat') private readonly chatModel: Model<Chat>,
                @InjectModel('User') private readonly userModel: Model<User>) { }

    async getUser(username): Promise<User>{
        const user = await this.userModel.findOne({username:username}).exec();
        return user;
    }

    async newUser(username){
        const user = await new this.userModel(new CreateUser(username));
        return user.save();
    }

    // async getChats(username){
    //     const user = await this.userModel.findOne({username:username}).exec();
    //     return user.chats;
    // }

    async newChat(username:string[]){
        const chat = await new this.chatModel(new CreateChat(username));
        for(let i = 0; i<username.length; i++)
        {
            console.log(username[i])
            let user = await this.userModel.findOne({username:username[i]}).exec();
            if(!user) continue;
            user.chats.push({id: chat.id, messages_seen:0})
            await this.userModel.findOneAndUpdate({username:username[i]}, user)
        }
        return chat.save();
    }

    async getChat(chatID){
        const chat = await this.chatModel.findOne({id:chatID}).exec();
        return chat;
    }

    async inviteUser(chatID, username){
        const chat = await this.chatModel.findOne({id:chatID}).exec();
        chat.members.push(username);
        await this.chatModel.findOneAndUpdate({id:chatID}, chat);
        
        const user = await this.userModel.findOne({username:username}).exec();
        user.chats.push({id: chatID, messages_seen:0})
        await this.userModel.findOneAndUpdate({username:username}, user);
        return `chat: ${chatID}, username: ${username}`
    }

    async kickUser(chatID, username){
        const chat = await this.chatModel.findOne({id:chatID}).exec();
        chat.members.splice(chat.members.indexOf(username), 1);
        await this.chatModel.findOneAndUpdate({id:chatID}, chat);
        
        const user = await this.userModel.findOne({username:username}).exec();
        user.chats.splice(user.chats.map((e)=>{return e.id}).indexOf(chatID), 1);
        await this.userModel.findOneAndUpdate({username:username}, user);
        return `chat: ${chatID}, username: ${username}`
    }


    async sendMessage(msg:SendMessage){
        let chat = await this.chatModel.findOne({id:msg.chatID}).exec();
        chat.messages.push({author:msg.author, text:msg.text, time:Date.now().toString()})
        chat.messageCount = Number(chat.messageCount) + 1;
        await this.chatModel.findOneAndUpdate({id:msg.chatID}, chat)
        return msg;
    }
}
