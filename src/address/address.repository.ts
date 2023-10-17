import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AddressRepository{
    constructor(private readonly httpService: HttpService,
                private readonly prisma: PrismaService){}

    async findAddressByCep(cep: string){
        return this.httpService.axiosRef.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => { return res })
        .catch(err => { return err })
    }

    createAddress(customer_id: number, { street, number, complement, locality , city, region_code, postal_code }){
        return this.prisma.address.create({
          data: {
            customer_id,
            street,
            number,
            complement,
            neighborhood: locality,
            city,
            postal_code,
            state_code: region_code
          }
        })
    }
}