import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class ProductsRepository {
    constructor(private readonly prisma: PrismaService){}
    
    findProducts() {
        return this.prisma.product.findMany()
    }

    findProductById(id: number) {
        return this.prisma.product.findUnique({
            where: { id }
        })
    }
}