import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ShippingRepository } from './shipping.repository';

@Injectable()
export class ShippingService {
    constructor(private readonly shippingRepository: ShippingRepository){}
    
    async calculateShippingPrice(cep: string) {
      const { data } = await this.shippingRepository.findShippingPrice(cep)

      if(!data) throw new ServiceUnavailableException('External request failed')

      if(data[0].error === "Transportadora não atende este trecho.") 
        throw new NotFoundException("Cep not found!")

      return data
    }
}
