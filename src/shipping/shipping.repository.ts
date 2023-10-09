import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';


@Injectable()
export class ShippingRepository{
    constructor(private readonly prisma: PrismaService){}
}