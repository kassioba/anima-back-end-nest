import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PaymentBodyDto } from "./dto/paymentBody.dto";

@Injectable()
export class PaymentRepository{
    constructor(private readonly prisma: PrismaService,
        private readonly httpService: HttpService){}
        
        async postPaymentData({cart, shipping, customer, address, card}: PaymentBodyDto, total: number) {
            return this.httpService.axiosRef
            .post('https://sandbox.api.pagseguro.com/orders', {
                customer,
                shipping: {
                    address
                },
                items: shipping ? [
                    ...cart,
                    {
                        ...shipping,
                        quantity: 1
                    }
                ] : [
                    ...cart
                ],
                notification_urls: [
                    "https://webhook.site/#!/743c0d38-9982-4bc6-8c67-d924460bf1f1/e113c36e-dad5-4460-b56f-8173d70ccb64/1"
                ],
                charges: [
                    {
                        amount: {
                            value: total,
                            currency: "BRL"
                        },
                        payment_method: {
                            card: {
                                ...card,
                                store: false, 
                            },
                            type: "CREDIT_CARD",
                            installments: 1,
                  capture: true,
                  soft_descriptor: "Lojânima"
                },
                notification_urls: "https://webhook.site/#!/743c0d38-9982-4bc6-8c67-d924460bf1f1/e113c36e-dad5-4460-b56f-8173d70ccb64/1"
            }
        ]
    }
    ,
    {
        headers: {
            Authorization: `Bearer ${process.env.PAGBANK_TOKEN}`
        }
    }
    
    )
    .then((resp) => {
        return resp.data
    })
    .catch((err) => { 
        return err.response.data 
    });
}
    createCustomer({ name, email, tax_id }) {
        return this.prisma.customer.create({
            data: {
                name,
                email,
                cpf: tax_id
            }
        })
    }

    createOrder(customer_id: number, { stock_id, quantity }){
        return this.prisma.order.create({
          data: {
            customer_id,
            stock_id,
            quantity
          }
        })
    }
}