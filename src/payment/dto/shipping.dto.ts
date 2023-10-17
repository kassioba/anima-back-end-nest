import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class ShippingDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    unit_amount: number
}