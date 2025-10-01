import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateNewsGalleryDto {
    @ApiProperty({ example: 'Stadium photo', description: 'Title of the gallery item' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Crowd cheering during the match', description: 'Optional caption for the image' })
    @IsString()
    @IsOptional()
    caption?: string;

    @ApiProperty({ example: 1, description: 'News ID this gallery belongs to' })
    @IsInt()
    @IsNotEmpty()
    newsId: number;

    @ApiProperty({ example: 12, description: 'Attachment ID from media table' })
    @IsInt()
    @IsNotEmpty()
    attachmentId: number;
}
