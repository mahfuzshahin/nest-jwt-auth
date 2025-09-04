import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './product-category.entity';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private categoriesRepository: Repository<ProductCategory>,
  ) {}

  findAll(): Promise<ProductCategory[]> {
    return this.categoriesRepository.find();
  }

  async findOne(id: number): Promise<ProductCategory> {
    const category = await this.categoriesRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    return category;
  }

  create(createDto: CreateProductCategoryDto): Promise<ProductCategory> {
    const newCategory = this.categoriesRepository.create(createDto);
    return this.categoriesRepository.save(newCategory);
  }

  async update(id: number, updateDto: UpdateProductCategoryDto): Promise<ProductCategory> {
    const category = await this.findOne(id);
    const updatedCategory = Object.assign(category, updateDto);
    return this.categoriesRepository.save(updatedCategory);
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoriesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
  }
}