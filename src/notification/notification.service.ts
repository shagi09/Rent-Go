import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
  ) {}

  async sendMessage(
    receiverId: string,
    title: string,
    content: string,
  ) {
    return this.messageModel.create({
      userId: receiverId,
      title,
      content,
    });
  }

  async getMyMessages(userId: string) {
    return this.messageModel.find({ receiverId: userId }).sort({ createdAt: -1 });
  }
}
