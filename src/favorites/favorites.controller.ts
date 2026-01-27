import { Controller, Post, Param, UseGuards, Get, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('user')
@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post(':listingId')
    add(@CurrentUser('userId') userId: string, @Param('listingId') listingId: string) {
    return this.favoritesService.addToFavorites(userId, listingId);
    }

    @Delete(':listingId')
    remove(@CurrentUser('userId') userId: string, @Param('listingId') listingId: string) {
    return this.favoritesService.removeFromFavorites(userId, listingId);
    }

    @Get()
    get(@CurrentUser('userId') userId: string) {
    return this.favoritesService.getFavorites(userId);
    }
}
