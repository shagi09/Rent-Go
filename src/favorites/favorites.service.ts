import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';


@Injectable()
export class FavoritesService {
constructor(
@InjectModel(Favorite.name)
private favoriteModel: Model<FavoriteDocument>,
) {}


async addToFavorites(userId: string, listingId: string) {
try {
return await this.favoriteModel.create({
userId: new Types.ObjectId(userId),
listingId: new Types.ObjectId(listingId),
});
} catch (err) {
throw new ConflictException('Listing already in favorites');
}
}

async removeFromFavorites(userId: string, listingId: string) {
const favorite = await this.favoriteModel.findOneAndDelete({
userId: new Types.ObjectId(userId),
listingId: new Types.ObjectId(listingId),
});
if (!favorite) {
throw new NotFoundException('Listing not found in favorites');
}
return favorite;
}

async getFavorites(userId: string) {
return this.favoriteModel.find({ userId }).exec();
}
}