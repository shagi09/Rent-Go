import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dtos/createreview.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/currentuser.decorator';


@ApiTags('Reviews')
@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewController {
constructor(private readonly reviewsService: ReviewService) {}

@UseGuards(JwtAuthGuard)
@Post()
create(
@Body() dto: CreateReviewDto,
@CurrentUser('userId') reviewerId: string,
) {
return this.reviewsService.create(dto, reviewerId);
}


@Get('listing/:id')
getListingRating(@Param('id') listingId: string) {
return this.reviewsService.getListingRating(listingId);
}
}