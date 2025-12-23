import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingSchema, Booking } from './schemas/booking.schema';
import { NotificationService } from 'src/notification/notification.service';
import { MessageSchema, Message } from 'src/notification/schemas/notification.schema';

@Module({
  imports: [
      MongooseModule.forFeature([{name: Booking.name, schema: BookingSchema},
        {name: Message.name, schema: MessageSchema},
      ]),
  ],
  providers: [BookingsService, NotificationService],
  controllers: [BookingsController],
  exports: [BookingsService]
})
export class BookingsModule {}
