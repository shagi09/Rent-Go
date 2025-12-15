import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dtos/createlisting.dto';
import { UpdateListingDto } from './dtos/updatelisting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Listing, ListingDocument } from './schemas/listings.schema';
import { Model } from 'mongoose';

@Injectable()
export class ListingsService {
    constructor(@InjectModel(Listing.name) private listingModel: Model<ListingDocument>) {}
    updateListing(id: string, dto: UpdateListingDto) {}

  async create(dto: CreateListingDto, photos: string[]) {
    return this.listingModel.create({
      ...dto,
      photos,
    });
  }

  async getOne(id: string) {
    return this.listingModel.findById(id).exec();
  }

  async getAll() {
    return this.listingModel.find().exec();
  }

    async search(query: any) {
        const {
        q,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
        } = query;

        const filter: any = { status: 'active' };

        if (q) {
        filter.$or = [
            { title: new RegExp(q, 'i') },
            { location: new RegExp(q, 'i') },
        ];
        }

        if (minPrice) filter.price = { $gte: minPrice };
        if (maxPrice) filter.price = { ...(filter.price || {}), $lte: maxPrice };

        const data = await this.listingModel
        .find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit));

        const total = await this.listingModel.countDocuments(filter);

        return { total, page: Number(page), data };
    }
}
