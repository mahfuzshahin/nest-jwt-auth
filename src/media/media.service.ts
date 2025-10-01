import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Media} from "./media.entity";
import {CreateMediaDto} from "./dto/create-media.dto";
import { Repository } from 'typeorm';
@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(Media)
        private readonly mediaRepository: Repository<Media>,
    ) {}

    async create(dto: CreateMediaDto): Promise<Media> {
        console.log('Saving DTO:', dto);
        const media = this.mediaRepository.create(dto);
        return this.mediaRepository.save(media);
    }
    detectType(mimetype: string): 'image' | 'video' | 'pdf' | 'other' {
        if (mimetype.startsWith('image/')) return 'image';
        if (mimetype.startsWith('video/')) return 'video';
        if (mimetype === 'application/pdf') return 'pdf';
        return 'other';
    }

    async findAll(): Promise<Media[]> {
        return this.mediaRepository.find({
            order: { createdAt: 'DESC' }, // newest first
        });
    }

    async findOne(id: number): Promise<Media> {
        const media = await this.mediaRepository.findOne({ where: { id } });
        if (!media) {
            throw new NotFoundException(`Media with ID ${id} not found`);
        }
        return media;
    }

    async remove(id: number): Promise<void> {
        await this.mediaRepository.delete(id);
    }
}
