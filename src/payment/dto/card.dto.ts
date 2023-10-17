import { IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from "class-validator"
import { HolderDto } from "./holder.dto"
import { Type } from "class-transformer"

export class CardDto{
    @IsString()
    @IsNotEmpty()
    number: string

    @IsNumber()
    @IsNotEmpty()
    exp_month: number

    @IsNumber()
    @IsNotEmpty()
    exp_year: number

    @IsString()
    @IsNotEmpty()
    security_code: string

    @IsObject()
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => HolderDto)
    holder: HolderDto
}