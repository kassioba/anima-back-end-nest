import { Injectable, NotFoundException } from '@nestjs/common';
import { StockRepository } from './stock.repository';

@Injectable()
export class StockService {
    constructor(private readonly stockRepository: StockRepository){}
    
    async getStockById(product_id: number) {
      const stock = await this.stockRepository.findStockByProductId(product_id)

      if(!stock.length) throw new NotFoundException()

      return stock
    }
}
