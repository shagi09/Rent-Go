import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Listing, ListingDocument } from 'src/listings/schemas/listings.schema';
import { Model , Types} from 'mongoose';
import { Roles } from 'src/decorators/roles.decorator';
import { BookingDocument } from 'src/bookings/schemas/booking.schema';
import { BookingStatus } from 'src/bookings/schemas/booking.schema';
import { Booking } from 'src/bookings/schemas/booking.schema';
import { NotFoundException } from '@nestjs/common';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel('Listing') private readonly listingModel: Model<ListingDocument>,
        @InjectModel('Booking') private readonly bookingModel: Model<BookingDocument>,
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
    ) {}

    async getAll() {
    return this.listingModel.find().exec();
  }

    approve(listingId: string) {
        return this.listingModel.findByIdAndUpdate(
        new Types.ObjectId(listingId),
        { moderationStatus: 'approved', rejectionReason: null },
        { new: true },
        );
        }

        reject(listingId: string) {
        return this.listingModel.findByIdAndUpdate(
        new Types.ObjectId(listingId),
        { moderationStatus: 'rejected' },
        { new: true },
        );
        }


        suspend(listingId: string) {
        return this.listingModel.findByIdAndUpdate(
        new Types.ObjectId(listingId),
        { moderationStatus: 'suspended' },
        { new: true },
        );
        }


        reactivate(listingId: string) {
        return this.listingModel.findByIdAndUpdate(
        new Types.ObjectId(listingId),
        { moderationStatus: 'approved' },
        { new: true },
        );
        }

    findAll(){
        return this.bookingModel
        .find()
        .populate('listingId')
        .populate('tenantId')
        .populate('ownerId');

    }

    async cancelBooking(bookingId: string, note?: string) {
        const booking = await this.bookingModel.findById(bookingId);
        if (!booking) throw new NotFoundException('Booking not found');


        status:BookingStatus.CANCELLED;


        return booking.save();
        }

    async suspendUser(userId: string) {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found');
        user.isActive = false;
        return user.save();
        }
    
        async reactivateUser(userId: string) {
        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found');
        user.isActive = true;
        return user.save();
        }
}
