import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductCategoryDto {
  @ApiProperty({ example: 'string', description: 'string' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'string', description: 'string' })
  @IsString()
  @IsOptional()
  description?: string;
}