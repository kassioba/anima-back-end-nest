import { IsString, MaxLength, MinLength } from "class-validator";

export class ShippingBodyDto{
    @IsString()
    @MinLength(8)
    @MaxLength(9)
    cep: string
}