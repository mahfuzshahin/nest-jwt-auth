import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'string', description: 'string' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'string', description: 'string' })
  @IsString()
  @IsOptional()
  description?: string;
}