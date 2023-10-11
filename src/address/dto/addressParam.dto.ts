import { IsString, Matches } from "class-validator";

export class AddressParamDto{
    @IsString()
    @Matches(/^(\d{5}-\d{3}|\d{8})$/)
    cep: string
}