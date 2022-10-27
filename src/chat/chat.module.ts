import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatSchema } from './schemas/chat.schema';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose/dist';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
 ],
  controllers: [ChatController],
  providers: [ChatService]
})
export class ChatModule {}
