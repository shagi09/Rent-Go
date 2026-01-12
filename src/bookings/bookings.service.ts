import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { BookingStatus } from './schemas/booking.schema';
import { CreateBookingDto } from './dtos/createbooking.dto';
import { NotificationService } from 'src/notification/notification.service'

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name)
    private bookingModel: Model<BookingDocument>,
    private NotificationService: NotificationService
  ) {}

  async create(dto: CreateBookingDto, userId: string) {
    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);

    if (start >= end) {
      throw new BadRequestException('Invalid booking dates');
    }

    // 🔒 Prevent double booking
    const conflict = await this.bookingModel.findOne({
      listingId: new Types.ObjectId(dto.listingId),
      status: { $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } },
      ],
    });

    if (conflict) {
      throw new BadRequestException('Listing already booked for selected dates');
    }

    return this.bookingModel.create({
      listingId: dto.listingId,
      userId,
      startDate: start,
      endDate: end,
      status: BookingStatus.PENDING,
    });

    // await this.NotificationService.sendMessage(
    //   userId,
    //   'Booking Created',
    //   `Your booking request has been received and is pending confirmation.`,
    // );
  }

  async updateStatus(id: string, status: BookingStatus) {
    return this.bookingModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
  }
}
