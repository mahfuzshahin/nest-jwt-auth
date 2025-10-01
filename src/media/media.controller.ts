import {
    BadRequestException,
    Controller, Get, Param, ParseIntPipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import {ApiOperation, ApiParam, ApiResponse} from "@nestjs/swagger";
import {Media} from "./media.entity";

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads', // store locally
                filename: (req, file, callback) => {
                    // generate unique filename
                    const uniqueName = `${Date.now()}-${Math.round(
                        Math.random() * 1e9,
                    )}${extname(file.originalname)}`;
                    callback(null, uniqueName);
                },
            }),
            limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
            fileFilter: (req, file, callback) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|mp4)$/)) {
                    return callback(
                        new Error('Only images, PDFs, or videos are allowed!'),
                        false,
                    );
                }
                callback(null, true);
            },
        }) as any,
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }
        const dto: CreateMediaDto = {
            type: this.mediaService.detectType(file.mimetype), // e.g. image, video, pdf
            filePath: file.filename, // just store filename
        };
        const media = await this.mediaService.create(dto);

        const fileUrl = `/uploads/${file.filename}`;

        return {
            message: 'File uploaded successfully!',
            media,
            url: fileUrl,
        };
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get media by ID' })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'ID of the media to retrieve',
    })
    @ApiResponse({
        status: 200,
        description: 'Media retrieved successfully',
        schema: {
            example: {
                id: 1,
                type: 'image',
                filePath: 'file-1696173674225-123456789.png',
                url: '/uploads/file-1696173674225-123456789.png',
                createdAt: '2025-10-01T10:05:30.000Z',
            },
        },
    })
    @ApiResponse({ status: 404, description: 'Media not found' })
    async getMediaById(@Param('id', ParseIntPipe) id: number) {
        const media: Media = await this.mediaService.findOne(id);

        // build full URL
        const fileUrl = `/uploads/${media.filePath}`;

        return {
            id: media.id,
            type: media.type,
            filePath: media.filePath,
            url: fileUrl,
            createdAt: media.createdAt,
        };
    }
    @Get()
    @ApiOperation({ summary: 'Get all uploaded media' })
    @ApiResponse({
        status: 200,
        description: 'List of all media',
        schema: {
            example: [
                {
                    id: 1,
                    type: 'image',
                    filePath: 'file-1696173674225-123456789.png',
                    url: '/uploads/file-1696173674225-123456789.png',
                    createdAt: '2025-10-01T10:05:30.000Z',
                },
                {
                    id: 2,
                    type: 'pdf',
                    filePath: 'file-1696173680000-987654321.pdf',
                    url: '/uploads/file-1696173680000-987654321.pdf',
                    createdAt: '2025-10-01T10:07:30.000Z',
                },
            ],
        },
    })
    async getAllMedia() {
        const mediaList: Media[] = await this.mediaService.findAll();

        // map each record to include public URL
        return mediaList.map((media) => ({
            id: media.id,
            type: media.type,
            filePath: media.filePath,
            url: `/uploads/${media.filePath}`,
            createdAt: media.createdAt,
        }));
    }
}
