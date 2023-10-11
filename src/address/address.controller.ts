import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressParamDto } from './dto/addressParam.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get('/:cep')
  getAddress(@Param() { cep }: AddressParamDto){
    return this.addressService.getAddressByCep(cep)
  }
}
