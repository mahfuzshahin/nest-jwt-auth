import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsOptional()
  inStock?: boolean;

  // ✅ --- ADD categoryId ---
  @IsNumber()
  @IsPositive() // Ensures the ID is a positive number
  categoryId: number;
}