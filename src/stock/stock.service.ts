import { Injectable, NotFoundException } from '@nestjs/common';
import { StockRepository } from './stock.repository';
import { CartDto } from 'src/payment/dto/cart.dto';

@Injectable()
export class StockService {
  constructor(private readonly stockRepository: StockRepository){}
  
  async getStockById(product_id: number) {
    const stock = await this.stockRepository.findStockByProductId(product_id)
    
    if(!stock.length) throw new NotFoundException()
    
    return stock
  }
  
  async checkStock(cart: CartDto[]){
    const outOfStockErrors: string[] = [];
    const notEnoughErrors: string[] = [];
    const DoNotExistError: number[] = [];
    
    for (const item of cart) {
      const check = await this.stockRepository.findStockById(item.stock_id)
      
      if(!check) {
        DoNotExistError.push(item.stock_id)
        continue
      }
        else if(!check.quantity) outOfStockErrors.push(item.name)
        else if(check.quantity - item.quantity < 0) notEnoughErrors.push(item.name)
    };

    if(DoNotExistError.length)
    return `stock_id ${DoNotExistError.join(', ')} do not exist`
    else if(outOfStockErrors.length && notEnoughErrors.length) 
    return `Product(s) ${outOfStockErrors.join(', ')} out of stock. Not enough ${notEnoughErrors.join(', ')} in stock.`
    else if(outOfStockErrors.length) 
    return `Product(s) ${outOfStockErrors.join(', ')} out of stock`
    else if (notEnoughErrors.length)
    return `Not enough ${notEnoughErrors.join(', ')} in stock.`
  }

  async updateStock(cart: CartDto[]) {
    const stocksHash = {}

    const stocks = await this.stockRepository.findStocksById(cart.map(item => item.stock_id))

    stocks.forEach(stock => stocksHash[stock.id] = stock.quantity);

    cart.forEach(async item => {
        const updateQuantity = stocksHash[item.stock_id] - item.quantity

        await this.stockRepository.updateStockQuantity(item.stock_id, updateQuantity)
    })
  }
}
