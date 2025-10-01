import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ example: 'string', description: 'string' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'string', description: 'string' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'string', description: 'string' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '2025-10-01T10:00:00Z', description: 'Creation timestamp', required: false })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ example: '2025-10-01T12:00:00Z', description: 'Last update timestamp', required: false })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @ApiProperty({ example: 1, description: 'ID of the user who created this category', required: false })
  @IsNumber()
  @IsOptional()
  createdBy?: number;

  @ApiProperty({ example: 1, description: 'ID of the user who last updated this category', required: false })
  @IsNumber()
  @IsOptional()
  updatedBy?: number;
}