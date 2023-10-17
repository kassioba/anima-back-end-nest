import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentBodyDto } from './dto/paymentBody.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  postPayment(@Body() body: PaymentBodyDto){
    return this.paymentService.postPayment(body)
  }
}
