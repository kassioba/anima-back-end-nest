import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class ShippingBodyDto{
    @IsString()
    @IsNotEmpty()
    @Matches(/^(\d{5}-\d{3}|\d{8})$/)
    cep: string
}