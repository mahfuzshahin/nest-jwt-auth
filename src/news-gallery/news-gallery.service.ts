import {Injectable, NotFoundException} from '@nestjs/common';
import {NewsGallery} from "./news-gallery.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {News} from "../news/news.entity";
import {Media} from "../media/media.entity";
import {CreateNewsGalleryDto} from "./dto/create-news-gallery.dto";
import {UpdateNewsGalleryDto} from "./dto/update-news-gallery.dto";

@Injectable()
export class NewsGalleryService {
    constructor(
        @InjectRepository(NewsGallery)
        private readonly galleryRepository: Repository<NewsGallery>,
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
        @InjectRepository(Media)
        private readonly mediaRepository: Repository<Media>,
    ) {}

    async create(dto: CreateNewsGalleryDto): Promise<NewsGallery> {
        const news = await this.newsRepository.findOne({ where: { id: dto.newsId } });
        if (!news) throw new NotFoundException(`News with ID ${dto.newsId} not found`);

        const media = await this.mediaRepository.findOne({ where: { id: dto.attachmentId } });
        if (!media) throw new NotFoundException(`Media with ID ${dto.attachmentId} not found`);

        const gallery = this.galleryRepository.create({
            title: dto.title,
            caption: dto.caption,
            news,
            attachment: media,
        });

        return this.galleryRepository.save(gallery);
    }

    async findAll(): Promise<NewsGallery[]> {
        return this.galleryRepository.find({ relations: ['news', 'attachment'] });
    }

    async findOne(id: number): Promise<NewsGallery> {
        const gallery = await this.galleryRepository.findOne({
            where: { id },
            relations: ['news', 'attachment'],
        });
        if (!gallery) throw new NotFoundException(`Gallery with ID ${id} not found`);
        return gallery;
    }

    async update(id: number, dto: UpdateNewsGalleryDto): Promise<NewsGallery> {
        const gallery = await this.findOne(id);

        if (dto.newsId) {
            const news = await this.newsRepository.findOne({ where: { id: dto.newsId } });
            if (!news) throw new NotFoundException(`News with ID ${dto.newsId} not found`);
            gallery.news = news;
        }

        if (dto.attachmentId) {
            const media = await this.mediaRepository.findOne({ where: { id: dto.attachmentId } });
            if (!media) throw new NotFoundException(`Media with ID ${dto.attachmentId} not found`);
            gallery.attachment = media;
        }

        if (dto.title !== undefined) gallery.title = dto.title;
        if (dto.caption !== undefined) gallery.caption = dto.caption;

        return this.galleryRepository.save(gallery);
    }

    async remove(id: number): Promise<void> {
        const gallery = await this.findOne(id);
        await this.galleryRepository.remove(gallery);
    }
}
