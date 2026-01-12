import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/notification.schema';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Message.name)
    private messageModel: Model<MessageDocument>,
    private emailService: EmailService,
    private smsService: SmsService
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

  async sendEmail(userId: string, email: string, title: string, message: string) {
    await this.emailService.sendEmail(email, title, message);


    return this.messageModel.create({
    userId,
    channel: 'email',
    title,
    content: message,
    });
    }
}




