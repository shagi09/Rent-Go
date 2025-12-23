import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class sendMessageDto {
    @ApiProperty({ example: '63c3b3e5e8f6e2c3c3c3c3c3' })
    userId: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;
}