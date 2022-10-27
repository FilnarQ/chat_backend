import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Query, Put, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChat } from './types/chat.type';
import { SendMessage } from './types/message.type';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post()
    async checkUser(@Res() res, @Body() body)
    {
        const user = await this.chatService.getUser(body.username);
        if(!user)
        {
            const newUser = this.chatService.newUser(body.username)
            return res.status(HttpStatus.OK).json(newUser)
        }
        return res.status(HttpStatus.OK).json(user)
        
    }

    @Get('/user/:username')
    async getUser(@Res() res, @Param('username') username)
    {
        return res.status(HttpStatus.OK).json(await this.chatService.getUser(username));
    }

    @Get('/chat/:chat')
    async getChat(@Res() res, @Param('chat') chatID)
    {
        return res.status(HttpStatus.OK).json(await this.chatService.getChat(chatID));
    }

    @Post('/chat')
    async newChat(@Res() res, @Body() body:{users:string[]})
    {
        const chat = await this.chatService.newChat(body.users);
        return res.status(HttpStatus.OK).json(chat);
    }

    @Post('/invite')
    async invite(@Res() res, @Body() body:{chat:string, username: string})
    {
        const action = await this.chatService.inviteUser(body.chat, body.username);
        return res.status(HttpStatus.OK).json(action);
    }

    @Post('/kick')
    async kick(@Res() res, @Body() body:{chat:string, username: string})
    {
        const action = await this.chatService.kickUser(body.chat, body.username);
        return res.status(HttpStatus.OK).json(action);
    }

    @Post('/message')
    async sendMessage(@Res() res, @Body() body)
    {
        //body:{chatID, author, text}
        const message = this.chatService.sendMessage(body);
        return res.status(HttpStatus.OK).json(message);
    }
}
