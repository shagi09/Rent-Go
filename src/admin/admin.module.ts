import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ListingSchema } from 'src/listings/schemas/listings.schema';
import { BookingSchema } from 'src/bookings/schemas/booking.schema';
import { UserSchema } from 'src/users/schemas/user.schema';

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
      },
      {
        name: 'User',
        schema: UserSchema
      }
    ])
  ],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService]
})
export class AdminModule {}
