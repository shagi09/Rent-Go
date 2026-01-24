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

    async getUserMetrics() {
        const totalUsers = await this.userModel.countDocuments();
        const activeUsers = await this.userModel.countDocuments({ isActive: true });
        const suspendedUsers = await this.userModel.countDocuments({ isActive: false });


        return { totalUsers, activeUsers, suspendedUsers };
        }

    async getListingMetrics() {
        const totalListings = await this.listingModel.countDocuments();
        const pendingListings = await this.listingModel.countDocuments({ moderationStatus: 'pending' });
        const approvedListings = await this.listingModel.countDocuments({ moderationStatus: 'approved' });
        const rejectedListings = await this.listingModel.countDocuments({ moderationStatus: 'rejected' });
        const suspendedListings = await this.listingModel.countDocuments({ moderationStatus: 'suspended' });


        return {
        totalListings,
        pendingListings,
        approvedListings,
        rejectedListings,
        suspendedListings,
        };
        }

     async getBookingMetrics() {
        const totalBookings = await this.bookingModel.countDocuments();
        const pendingBookings = await this.bookingModel.countDocuments({ status: 'pending' });
        const confirmedBookings = await this.bookingModel.countDocuments({ status: 'confirmed' });
        const cancelledBookings = await this.bookingModel.countDocuments({ status: 'cancelled' });
        const completedBookings = await this.bookingModel.countDocuments({ status: 'completed' });


        return {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
        completedBookings,
        };
        }

    async getOverallAnalytics() {
        const [users, listings, bookings] = await Promise.all([
        this.getUserMetrics(),
        this.getListingMetrics(),
        this.getBookingMetrics()
        ]);


        return { users, listings, bookings };
        }

    
}
