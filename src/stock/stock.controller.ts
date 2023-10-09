import { Controller, Get, Param } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockParamDto } from './dto/stockParam.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('/:product_id')
  getStockById(@Param() { product_id }: StockParamDto){
    return this.stockService.getStockById(+product_id)
  }
}
