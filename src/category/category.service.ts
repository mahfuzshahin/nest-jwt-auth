import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Category} from "./category.entity";
import {Repository} from "typeorm";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    // Get all categories
    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    // Get a category by ID
    async findOne(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }
        return category;
    }
    generateSlug(text: string): string {
        return text
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with dash
            .replace(/^-+|-+$/g, '');   // Remove leading/trailing dashes
    }
    // Create a new category
    async create(dto: CreateCategoryDto, userId: number): Promise<Category> {
        const slug = this.generateSlug(dto.name);
        const category = this.categoryRepository.create({
            ...dto,
            slug,
            createdBy: userId,
            updatedBy: userId,
        });
        return this.categoryRepository.save(category);
    }

    // Update an existing category
    async update(id: number, dto: UpdateCategoryDto, userId: number): Promise<Category> {
        const category = await this.findOne(id);
        Object.assign(category, dto);
        category.updatedBy = userId;
        return this.categoryRepository.save(category);
    }

    // Delete a category
    async remove(id: number): Promise<void> {
        const category = await this.findOne(id);
        await this.categoryRepository.remove(category);
    }
}
