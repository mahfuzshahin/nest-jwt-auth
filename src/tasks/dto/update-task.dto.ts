import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({ example: 'string', description: 'string' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'false', description: 'false' })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}