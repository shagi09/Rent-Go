import { Controller, UseGuards } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/decorators/currentuser.decorator';

@Controller('owner')
export class OwnerController {
    constructor(private ownerService: OwnerService) {}

    @UseGuards(JwtAuthGuard)
    @Get('listings')
    getListings(@CurrentUser('userId') userId: string) {
        return this.ownerService.getListings(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('bookings')
    getBookings(@CurrentUser('userId') userId: string) {
        return this.ownerService.getBookings(userId);
    }
}
