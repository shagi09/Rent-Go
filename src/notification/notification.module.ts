import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from './schemas/notification.schema';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }])
  ],
  controllers: [NotificationController],
  providers: [NotificationService, EmailService, SmsService],
  exports: [NotificationService, EmailService, SmsService],
})
export class NotificationModule {}
