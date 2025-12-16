import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dtos/createbooking.dto';
import { BookingStatus } from './schemas/booking.schema';
import { CurrentUser } from 'src/decorators/currentuser.decorator';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  // BOOK A ROOM
  @Post()
  create(@CurrentUser('userId') userId: string, @Body() dto: CreateBookingDto) {
    // tenantId should come from auth (JWT)
    //const tenantId = '64f000000000000000000001';
    return this.service.create(dto, userId);
  }

  // UPDATE BOOKING STATUS
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: BookingStatus,
  ) {
    return this.service.updateStatus(id, status);
  }
}
