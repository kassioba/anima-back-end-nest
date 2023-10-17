import { IsEmail, IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from "class-validator";

export class CustomerDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNumberString()
    @MinLength(11)
    @MaxLength(11)
    @IsNotEmpty()
    tax_id: string
}