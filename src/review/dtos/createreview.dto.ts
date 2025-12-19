import { IsEnum, IsInt, IsMongoId, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
//import { ReviewType } from '../schemas/review.schema';


export class CreateReviewDto {
// @ApiProperty({ enum: ReviewType })
// @IsEnum(ReviewType)
// type: ReviewType;


@ApiProperty({ minimum: 1, maximum: 5 })
@IsInt()
@Min(1)
@Max(5)
rating: number;


@ApiProperty({ required: false })
@IsOptional()
comment?: string;


@ApiProperty({ required: false })
@IsOptional()
@IsMongoId()
listingId?: string;


@ApiProperty({ required: false })
@IsOptional()
@IsMongoId()
userId?: string;

}