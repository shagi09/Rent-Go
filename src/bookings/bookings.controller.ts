import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dtos/createbooking.dto';
import { BookingStatus } from './schemas/booking.schema';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly service: BookingsService) {}

  // BOOK A ROOM
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('user')
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
