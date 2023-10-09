import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';


@Injectable()
export class ShippingRepository{
    constructor(private readonly httpService: HttpService){}

    findShippingPrice(cep: string){
        return this.httpService.axiosRef
            .post('https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate',{
                from: {postal_code: '52050480'},
                to: {postal_code: `${cep}`}
              },
              {
                headers: {
                  Authorization: `Bearer ${process.env.MELHOR_ENVIO_API_ACCESS_TOKEN}`
                }
              })
              .then(res => { return res })
              .catch(err => { return err })
    }
}