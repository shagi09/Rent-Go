import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get, Param, Put, Body } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    // @Get(':id')
    // getUser(@Param('id') id: string) {
    //     return this.usersService.findById(id);
    // }

    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('user')
    @Get('me')
    getMe(@CurrentUser('userId') userId: string) {
        console.log(userId);
        return this.usersService.findById(userId);
    }

    // @Put(':id')
    // updateUser(@Param('id') id: string, @Body() patch: Partial<User>) {
    //     return this.usersService.updateProfile(id, patch);
    // }
}
