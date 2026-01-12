import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

//   @Prop({ type: Types.ObjectId, ref: 'User' })
//   senderId?: Types.ObjectId; // system or owner

@Prop({ enum: ['email', 'sms'], required: true })
channel: 'email' | 'sms';


  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  isRead: boolean;
  
  @Prop({ default: 'sent' })
  status: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
