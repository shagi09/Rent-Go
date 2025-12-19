import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ReviewDocument } from './schemas/review.schema';
import { BookingDocument } from 'src/bookings/schemas/booking.schema';
import { CreateReviewDto } from './dtos/createreview.dto';
// import { ReviewType } from './schemas/review.schema';
import { BadRequestException } from '@nestjs/common';
import { BookingStatus } from 'src/bookings/schemas/booking.schema';
import { Types } from 'mongoose';


@Injectable()
export class ReviewService {
    constructor(
        @InjectModel('Review') private readonly reviewModel: Model<ReviewDocument>,
        @InjectModel('Booking') private readonly bookingModel: Model<BookingDocument>,
    ) {}

    async create(dto: CreateReviewDto, reviewerId: string) {
        // 🔒 Prevent fake reviews {
        const booking = await this.bookingModel.findOne({
        listingId: new Types.ObjectId(dto.listingId),
        tenantId: new Types.ObjectId(reviewerId),
        status: BookingStatus.COMPLETED,
        });


        if (!booking) {
        throw new BadRequestException('You can only review listings you stayed in');
        }
        


        return this.reviewModel.create({
        reviewerId,
        ...dto,
        });
        }


        async getListingRating(listingId: string) {
        const result = await this.reviewModel.aggregate([
        { $match: { listingId: new Types.ObjectId(listingId) } },
        {
        $group: {
        _id: '$listingId',
        avgRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 },
        },
        },
        ]);


        return result[0] || { avgRating: 0, totalReviews: 0 };
        }


}
