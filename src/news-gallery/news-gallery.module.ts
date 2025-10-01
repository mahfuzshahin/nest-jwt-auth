import { Module } from '@nestjs/common';
import { NewsGalleryService } from './news-gallery.service';
import { NewsGalleryController } from './news-gallery.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {NewsGallery} from "./news-gallery.entity";
import {News} from "../news/news.entity";
import {Media} from "../media/media.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NewsGallery, News, Media])],
  providers: [NewsGalleryService],
  controllers: [NewsGalleryController]
})
export class NewsGalleryModule {}
