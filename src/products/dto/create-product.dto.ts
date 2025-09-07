import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'string', description: 'string' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'number', description: 'number' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  // ✅ --- ADD categoryId ---
  @ApiProperty({ example: 'number', description: 'number' })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  categoryId?: number;
}