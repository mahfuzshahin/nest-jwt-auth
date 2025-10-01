import {IsDate, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'testuser', description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '2025-10-01T10:00:00Z', description: 'Creation timestamp', required: false })
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ example: '2025-10-01T12:00:00Z', description: 'Last update timestamp', required: false })
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

}