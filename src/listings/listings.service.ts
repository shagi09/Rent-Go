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
}
