import { ApiProperty } from '@nestjs/swagger';
import {IsEmail,IsString} from 'class-validator'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export type UserRole = 'user' | 'admin';


@Schema({ timestamps: true })
export class User extends Document {
  
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: ['user', 'admin'],default: 'user' })
  role: 'user' | 'admin';

  createdAt: Date;
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
