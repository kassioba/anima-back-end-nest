import { IsNotEmpty, IsString } from "class-validator";

export class HolderDto{
    @IsString()
    @IsNotEmpty()
    name: string
}