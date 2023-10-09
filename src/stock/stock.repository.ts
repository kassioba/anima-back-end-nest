import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";

@Injectable()
export class StockRepository{
    constructor(private readonly prisma: PrismaService){}
    
    findStockByProductId(product_id: number) {
        return this.prisma.stock.findMany({
            where: { product_id }
        })
    }
}