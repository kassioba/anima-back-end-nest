import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CartDto{
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    stock_id: number

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    unit_amount: number

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    quantity: number
}