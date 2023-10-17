import { HttpException, HttpStatus, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { PaymentBodyDto } from './dto/paymentBody.dto';
import { CartDto } from './dto/cart.dto';
import { StockService } from 'src/stock/stock.service';
import { CustomerDto } from './dto/customer.dto';
import { AddressRepository } from 'src/address/address.repository';
import { AddressDto } from './dto/address.dto';

@Injectable()
export class PaymentService {
    constructor(private readonly paymentRepository: PaymentRepository,
                private readonly stockService: StockService,
                private readonly addressRepository: AddressRepository
                ){}
    
    async postPayment(body: PaymentBodyDto) {
        const { cart } = body
    
        const total = this.calculateTotalInBRLCents(body)
    
        const stockCheck = await this.stockService.checkStock(cart)
    
        if(stockCheck) throw new NotFoundException(stockCheck)
    
        // Criptografar cartão
        const payment = await this.paymentRepository.postPaymentData(body, total)
        // Criptografar cartão

        if(payment.error_messages || !payment) {
            const errors = payment.error_messages?.map((e: any) => `${e.parameter_name} ${e.description}`)
    
            throw new ServiceUnavailableException(errors?.join(', '))
        }
    
        if(payment?.charges[0]?.status === "DECLINED") throw new HttpException('Card declined.', HttpStatus.PAYMENT_REQUIRED)
        
        await this.stockService.updateStock(cart)
    
        await this.storeCustomerData(payment.customer, payment.shipping.address, cart)
    
        return payment
    }

    calculateTotalInBRLCents({ cart, shipping }: PaymentBodyDto){
        let total = 0;
    
        cart.forEach(item => total += item.quantity * item.unit_amount)
    
        if(shipping) total += shipping.unit_amount
    
        return total * 100
    }

    async storeCustomerData(customerData: CustomerDto, address: AddressDto, cart: CartDto[]){
        const customer = await this.paymentRepository.createCustomer(customerData)
    
        await this.addressRepository.createAddress(customer.id, address)
    
        for (const item of cart){
            await this.paymentRepository.createOrder(customer.id, item)
        }
    }
}
