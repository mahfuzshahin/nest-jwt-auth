import { PartialType } from '@nestjs/swagger';
import {CreateNewsGalleryDto} from "./create-news-gallery.dto";

export class UpdateNewsGalleryDto extends PartialType(CreateNewsGalleryDto) {}
