import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Listing, ListingSchema } from 'src/listings/schemas/listings.schema';
import { Booking, BookingSchema } from 'src/bookings/schemas/booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Listing.name, schema: ListingSchema },
      { name: Booking.name, schema: BookingSchema },
    ]),
  ],
  providers: [OwnerService],
  controllers: [OwnerController],
  exports: [OwnerService]
})
export class OwnerModule {}
