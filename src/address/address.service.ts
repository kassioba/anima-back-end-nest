import { Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
    constructor(private readonly addressRepository: AddressRepository){}
    
    async getAddressByCep(cep: string) {
      const { data } = await this.addressRepository.findAddressByCep(cep)

      if(!data) throw new ServiceUnavailableException()
      else if(data.erro) throw new NotFoundException('Cep not found!')

      return data
    }
}
