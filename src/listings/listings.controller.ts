import { Controller, Post, Body,Get, Param, Query } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dtos/createlisting.dto';
import { UpdateListingDto } from './dtos/updatelisting.dto';
import { UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiConsumes,ApiBody } from '@nestjs/swagger';


@Controller('listings')
export class ListingsController {
    constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
    @ApiBody({
    schema: {
      type: 'object',
      required: ['title', 'description', 'price', 'location'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        location: { type: 'string' },
        photos: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('photos', 5, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const unique = Date.now() + extname(file.originalname);
          cb(null, unique);
        },
      }),
    }),
  )
  create(
    @Body() dto: CreateListingDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const photos = files?.map(f => `/uploads/${f.filename}`) || [];
    return this.listingsService.create(dto, photos);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.listingsService.getOne(id);
  }

  @Get()
  getAll() {
    return this.listingsService.getAll();
  }

  @Get('/search')
  search(@Query('query') query: any) {
    return this.listingsService.search(query);
  }
}
