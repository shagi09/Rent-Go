import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Listing, ListingDocument } from 'src/listings/schemas/listings.schema';
import { Booking, BookingDocument } from 'src/bookings/schemas/booking.schema';
import { Model } from 'mongoose';

@Injectable()
export class OwnerService {
    constructor(
        @InjectModel(Listing.name) private listingModel: Model<ListingDocument>,
        @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    ) {}

    async getListings(userId: string) {
        return this.listingModel.find({ userId }).exec();
    }

    async getBookings(userId: string) {
        return this.bookingModel.find({ userId }).exec();
    }
}
