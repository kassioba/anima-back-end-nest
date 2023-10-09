import { IsNumberString } from "class-validator";

export class ProductsParamDto{
    @IsNumberString()
    id: string
}