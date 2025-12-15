import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Get, Param, Put, Body } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @Get(':id')
    getUser(@Param('id') id: string) {
        return this.usersService.findById(id);
    }

    // @Put(':id')
    // updateUser(@Param('id') id: string, @Body() patch: Partial<User>) {
    //     return this.usersService.updateProfile(id, patch);
    // }
}
