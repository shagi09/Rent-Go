import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListingDto {
  @IsString() @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString() @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  price: number;

  @IsString() @IsNotEmpty()
  @ApiProperty()
  location: string;

//   @IsOptional() @IsArray()

//   amenities?: string[];
}
