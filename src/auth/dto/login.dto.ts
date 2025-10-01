import { ApiProperty } from '@nestjs/swagger';
import {IsDate, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'testuser', description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;

}