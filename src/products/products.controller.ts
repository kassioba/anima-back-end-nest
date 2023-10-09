import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsParamDto } from './dto/productsParam.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(){
    return this.productsService.getProducts()
  }

  @Get('/:id')
  getProductById(@Param() { id }: ProductsParamDto){
    return this.productsService.getProductById(+id)
  }
}
