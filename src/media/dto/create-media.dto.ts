import { IsNotEmpty, IsEnum, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateMediaDto {
    @ApiProperty()
    type: string;

    @ApiProperty()
    filePath: string;
}
