// src/news/dto/create-news.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsInt } from 'class-validator';

export class CreateNewsDto {
    @ApiProperty({ example: 'Breaking News Title' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'breaking-news-title' })
    @IsOptional()
    slug?: string; // auto-generate if not provided

    @ApiProperty({ example: 'This is the full content of the news article' })
    @IsNotEmpty()
    content: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    category_id: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    author_id: number;

    @ApiProperty({ example: 'draft', enum: ['draft', 'published'] })
    @IsEnum(['draft', 'published'])
    status: 'draft' | 'published';

    @ApiProperty({ example: '2025-10-02T10:00:00Z', required: false })
    @IsOptional()
    publishAt?: Date;

    @ApiProperty({ example: 5, description: 'ID of the featured image (media.id)' })
    @IsOptional()
    attachment_id?: number;
}
