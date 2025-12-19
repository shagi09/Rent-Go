// export enum ReviewType {
// LISTING = 'listing',
// OWNER = 'owner',
// }


// ==============================
// reviews/schemas/review.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type ReviewDocument = Review & Document;


@Schema({ timestamps: true })
export class Review {
@Prop({ type: Types.ObjectId, ref: 'User', required: true })
reviewerId: Types.ObjectId; // tenant


@Prop({ type: Types.ObjectId, ref: 'Listing', required: false })
listingId?: Types.ObjectId;


// @Prop({ type: Types.ObjectId, ref: 'User', required: false })
// userId?: Types.ObjectId;


// @Prop({ enum: ReviewType, required: true })
// type: ReviewType;


@Prop({ min: 1, max: 5, required: true })
rating: number;


@Prop()
comment: string;
}


export const ReviewSchema = SchemaFactory.createForClass(Review);