import {Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {ApiBearerAuth, ApiOperation} from "@nestjs/swagger";
import {AuthGuard} from "@nestjs/passport";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";
import {GetUser} from "../auth/get-user.decorator";

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    async findAll() {
        return this.categoryService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get category by ID' })
    async findOne(@Param('id') id: number) {
        return this.categoryService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @UseGuards(AuthGuard('jwt')) // optional
    @ApiBearerAuth()
    async create(@Body() dto: CreateCategoryDto, @GetUser('userId') userId: number) {
        return this.categoryService.create(dto, userId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a category' })
    @UseGuards(AuthGuard('jwt')) // optional
    @ApiBearerAuth()
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateCategoryDto,
        @GetUser('userId') userId: number,
    ) {
        return this.categoryService.update(id, dto, userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a category' })
    @UseGuards(AuthGuard('jwt')) // optional
    @ApiBearerAuth()
    async remove(@Param('id') id: number) {
        return this.categoryService.remove(id);
    }
}

