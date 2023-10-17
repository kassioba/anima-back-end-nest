import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StockRepository{
    constructor(private readonly prisma: PrismaService){}
    
    findStockByProductId(product_id: number) {
        return this.prisma.stock.findMany({
            where: { product_id }
        })
    }
    
    findStockById(id: number) {
        return this.prisma.stock.findUnique({
            where: { id }
        })
    }
    
    findStocksById(ids: number[]) {
        return this.prisma.stock.findMany({
            where: { id: { in: ids } },
            select: {
                id: true,
                quantity: true
            }
        })
    }
    
    updateStockQuantity(id: number, quantity: number) {
        return this.prisma.stock.update({
            where: { id },
            data: { quantity }
        })
    }
}