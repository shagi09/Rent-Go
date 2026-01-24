import { Controller, Get, Patch, UseGuards,Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminService } from './admin.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService){}

    @Get('listings')
    getListings(){
        return this.adminService.getAll();
    }

    @Patch(':listingId/approve')
    approve(@Param('listingId') listingId: string){
        return this.adminService.approve(listingId);
    }

    @Patch(':listingId/reject')
    reject(@Param('listingId') listingId: string){
        return this.adminService.reject(listingId);
    }

    @Patch(':listingId/suspend')
    suspend(@Param('listingId') listingId: string){
        return this.adminService.suspend(listingId);
    }

    @Patch(':listingId/reactivate')
    reactivate(@Param('listingId') listingId: string){
        return this.adminService.reactivate(listingId);
    }

    @Get('bookings')
    getBookings(){
        return this.adminService.findAll();
    }

    @Patch(':bookingId/cancel')
    cancelBooking(@Param('bookingId') bookingId: string){
        return this.adminService.cancelBooking(bookingId);
    }

    @Patch(':userId/suspend')
    suspendUser(@Param('userId') userId: string){
        return this.adminService.suspendUser(userId);
    }

    @Patch(':userId/reactivate')
    reactivateUser(@Param('userId') userId: string){
        return this.adminService.reactivateUser(userId);
    }

    @Get('overall')
    getOverallAnalytics(){
        return this.adminService.getOverallAnalytics();
    }

    @Get('users')
    getAllUsers(){
        return this.adminService.getUserMetrics();
    }

    @Get('listings')
    getAllListings(){
        return this.adminService.getListingMetrics();
    }

    @Get('bookings')
    getAllBookings(){
        return this.adminService.getBookingMetrics();
    }


}
