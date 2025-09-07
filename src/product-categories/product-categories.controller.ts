import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  HttpCode,
  HttpStatus, UseGuards,
} from '@nestjs/common';
import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('product-categories')
export class ProductCategoriesController {
  constructor(private readonly categoriesService: ProductCategoriesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get the All Category' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successfully retrieved Category.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return { data: categories };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Get One Category' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successfully retrieved Category.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoriesService.findOne(id);
    return { data: category };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create Product' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Successfully created Category.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })

  async create(@Body() createDto: CreateProductCategoryDto) {
    const newCategory = await this.categoriesService.create(createDto);
    return { data: newCategory };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOperation({ summary: 'Update Category' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successfully updated Category.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateProductCategoryDto,
  ) {
    const updatedCategory = await this.categoriesService.update(id, updateDto);
    return { data: updatedCategory };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete Category' })
  @ApiBearerAuth()
  @ApiResponse({ status: 204, description: 'Successfully deleted Category.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}