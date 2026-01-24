import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingSchema } from 'src/listings/schemas/listings.schema';
import { BookingSchema } from 'src/bookings/schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Listing',
        schema: ListingSchema
      },
      {
        name: 'Booking',
        schema: BookingSchema
      }
    ])
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService]
})
export class AdminModule {}
