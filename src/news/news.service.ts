import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {News} from "./news.entity";
import {Repository} from "typeorm";
import {CreateNewsDto} from "./dto/create-news.dto";
import {UpdateNewsDto} from "./dto/update-news.dto";

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
    ) {}
    generateSlug(text: string): string {
        return text
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word chars with dash
            .replace(/^-+|-+$/g, '');   // Remove leading/trailing dashes
    }

    async create(dto: CreateNewsDto, userId: number): Promise<News> {
        const slug = dto.slug ?? this.generateSlug(dto.title);

        const news = this.newsRepository.create({
            ...dto,
            slug,
            createdBy: userId,
            updatedBy: userId,
        });
        return this.newsRepository.save(news);
    }

    async findAll(): Promise<News[]> {
        return this.newsRepository.find({ order: { createdAt: 'DESC' } });
    }

    async findOne(id: number): Promise<News> {
        const news = await this.newsRepository.findOne({ where: { id } });
        if (!news) throw new NotFoundException(`News with ID ${id} not found`);
        return news;
    }

    async update(id: number, dto: UpdateNewsDto, userId: number): Promise<News> {
        const news = await this.findOne(id);
        Object.assign(news, dto, { updatedBy: userId });
        return this.newsRepository.save(news);
    }

    async remove(id: number): Promise<void> {
        const result = await this.newsRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`News with ID ${id} not found`);
        }
    }
}
