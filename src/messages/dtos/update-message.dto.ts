import { IsOptional, IsString } from "class-validator";

export class UpdateMessageDTO {
    @IsString()
    @IsOptional()
    content: string;
    @IsString()
    @IsOptional()
    status: string
}