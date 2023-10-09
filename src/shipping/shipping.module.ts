import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { ShippingRepository } from './shipping.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ShippingController],
  providers: [ShippingService, ShippingRepository],
})
export class ShippingModule {}
