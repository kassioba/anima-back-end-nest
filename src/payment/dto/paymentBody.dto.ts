import { IsArray, IsNotEmpty, IsObject, IsOptional, ValidateNested } from "class-validator";
import { CartDto } from "./cart.dto";
import { CustomerDto } from "./customer.dto";
import { AddressDto } from "./address.dto";
import { CardDto } from "./card.dto";
import { ShippingDto } from "./shipping.dto";
import { Type } from "class-transformer";

export class PaymentBodyDto{
    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CartDto)
    cart: CartDto[]

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CustomerDto)
    customer: CustomerDto

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CardDto)
    card: CardDto

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => ShippingDto)
    shipping?: ShippingDto
}