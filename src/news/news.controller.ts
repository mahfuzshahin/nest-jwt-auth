import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Put,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import {News} from "./news.entity";

@ApiTags('News')
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a news article' })
    @ApiResponse({ status: 201, description: 'News created successfully' })
    async create(@Body() dto: CreateNewsDto) {
        const userId = 1; // TODO: get from auth (req.user.userId)
        return this.newsService.create(dto, userId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all news articles' })
    async findAll(): Promise<News[]> {
        return this.newsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single news article by ID' })
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<News> {
        return this.newsService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a news article' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateNewsDto,
    ) {
        const userId = 1; // TODO: get from auth
        return this.newsService.update(id, dto, userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a news article' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.newsService.remove(id);
    }
}
