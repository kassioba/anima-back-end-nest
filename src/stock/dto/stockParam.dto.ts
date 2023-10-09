import { IsNumberString } from "class-validator";

export class StockParamDto{
    @IsNumberString()
    product_id: string
}