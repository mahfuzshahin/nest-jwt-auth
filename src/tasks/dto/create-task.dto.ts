import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto{
  @ApiProperty({ example: 'string', description: 'string' })
  @IsString()
  @IsNotEmpty()
  title: string;
}