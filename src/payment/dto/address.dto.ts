import { IsNotEmpty, IsString, Matches } from "class-validator"

export class AddressDto{
    @IsString()
    @IsNotEmpty()
    street: string

    @IsString()
    @IsNotEmpty()
    number: string

    @IsString()
    @IsNotEmpty()
    complement: string

    @IsString()
    @IsNotEmpty()
    locality: string

    @IsString()
    @IsNotEmpty()
    city: string

    @IsString()
    @IsNotEmpty()
    region_code: string

    @IsString()
    @IsNotEmpty()
    country: string

    @IsString()
    @IsNotEmpty()
    @Matches(/^(\d{5}-\d{3}|\d{8})$/)
    postal_code: string
}