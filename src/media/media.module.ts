import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Media} from "./media.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  providers: [MediaService],
  controllers: [MediaController]
})
export class MediaModule {}
