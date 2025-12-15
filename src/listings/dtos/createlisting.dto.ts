import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateListingDto {
  @IsString() @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString() @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  price: number;

  @IsString() @IsNotEmpty()
  @ApiProperty()
  location: string;

//   @IsOptional() @IsArray()

//   amenities?: string[];
}
