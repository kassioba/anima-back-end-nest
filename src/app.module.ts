import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';
import { ShippingModule } from './shipping/shipping.module';
import { PaymentModule } from './payment/payment.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProductsModule, StockModule, ShippingModule, PaymentModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
