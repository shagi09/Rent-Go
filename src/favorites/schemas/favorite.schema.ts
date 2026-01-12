import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type FavoriteDocument = Favorite & Document;


@Schema({ timestamps: true })
export class Favorite {
@Prop({ type: Types.ObjectId, ref: 'User', required: true })
userId: Types.ObjectId;


@Prop({ type: Types.ObjectId, ref: 'Listing', required: true })
listingId: Types.ObjectId;
}


export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
FavoriteSchema.index({ userId: 1, listingId: 1 }, { unique: true });