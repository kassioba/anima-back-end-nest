import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingBodyDto } from './dto/shippingBody.dto';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  calculateShippingPrice(@Body() { cep }: ShippingBodyDto){
    return this.shippingService.calculateShippingPrice(cep)
  }
}
