import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {NewsGalleryService} from "./news-gallery.service";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {CreateNewsGalleryDto} from "./dto/create-news-gallery.dto";
import {NewsGallery} from "./news-gallery.entity";
import {UpdateNewsGalleryDto} from "./dto/update-news-gallery.dto";

@Controller('news-gallery')
export class NewsGalleryController {
    constructor(private readonly galleryService: NewsGalleryService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new gallery item' })
    @ApiResponse({ status: 201, description: 'Gallery created successfully', type: NewsGallery })
    async create(@Body() dto: CreateNewsGalleryDto) {
        return this.galleryService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all gallery items' })
    @ApiResponse({ status: 200, description: 'List of galleries', type: [NewsGallery] })
    async findAll() {
        return this.galleryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a gallery item by ID' })
    @ApiResponse({ status: 200, description: 'Gallery item', type: NewsGallery })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.galleryService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a gallery item' })
    @ApiResponse({ status: 200, description: 'Gallery updated successfully', type: NewsGallery })
    async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNewsGalleryDto) {
        return this.galleryService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a gallery item' })
    @ApiResponse({ status: 204, description: 'Gallery deleted successfully' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.galleryService.remove(id);
    }
}
