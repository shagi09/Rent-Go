import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type PaymentDocument = Payment & Document;


@Schema({ timestamps: true })
export class Payment {
@Prop({ type: Types.ObjectId, ref: 'Booking', required: true })
bookingId: Types.ObjectId;


@Prop({ required: true })
amount: number;


@Prop({ required: true })
txRef: string;


@Prop({ default: 'pending' })
status: 'pending' | 'paid' | 'failed';
}


export const PaymentSchema = SchemaFactory.createForClass(Payment);