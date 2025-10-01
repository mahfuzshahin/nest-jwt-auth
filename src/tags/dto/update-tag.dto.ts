import { IsOptional, IsString } from 'class-validator';
import {ApiProperty, PartialType} from '@nestjs/swagger';
import {CreateTagDto} from "./create-tag.dto";

export class UpdateTagDto extends PartialType(CreateTagDto) {
}