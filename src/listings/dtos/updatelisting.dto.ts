import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateListingDto {
  @IsOptional() @IsString()
  @ApiProperty()
  title?: string;

  @IsOptional() @IsString()
  @ApiProperty()
  description?: string;

  @IsOptional() @IsNumber()
  @ApiProperty()
  price?: number;

  @IsOptional() @IsString()
  @ApiProperty()
  location?: string;

//   @IsOptional() @IsArray()
//   @ApiProperty()
//   amenities?: string[];
}
