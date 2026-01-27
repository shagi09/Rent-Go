import { Controller, Post, Body,Get, Param, Query, UseGuards } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dtos/createlisting.dto';
import { UpdateListingDto } from './dtos/updatelisting.dto';
import { UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiConsumes,ApiBody } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorators/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@Controller('listings')
export class ListingsController {
    constructor(private readonly listingsService: ListingsService) {}

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('admin')
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
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateListingDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const photos = files?.map(f => `/uploads/${f.filename}`) || [];
    return this.listingsService.create(dto, photos,userId);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('user')
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.listingsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('user')
  @Get()
  getAll() {
    return this.listingsService.getAll();
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles('user')
  @Get('/search')
  search(@Query('query') query: any) {
    return this.listingsService.search(query);
  }
}
