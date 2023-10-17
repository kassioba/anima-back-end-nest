import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './payment.repository';
import { HttpModule } from '@nestjs/axios';
import { StockModule } from 'src/stock/stock.module';
import { AddressModule } from 'src/address/address.module';

@Module({
  imports: [HttpModule, StockModule, AddressModule],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
})
export class PaymentModule {}
