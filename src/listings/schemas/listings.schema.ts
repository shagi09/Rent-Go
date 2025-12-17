import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

export type ListingDocument = Listing & Document;

@Schema({ timestamps: true })
export class Listing {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  location: string;

  @Prop({ type: [String], default: [] })
  photos: string[];

  @Prop({ enum: ['active', 'paused'], default: 'active' })
  status: string;
}

export const ListingSchema = SchemaFactory.createForClass(Listing);
