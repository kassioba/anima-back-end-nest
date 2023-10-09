import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository){}
  
  async getProducts() {
    return this.productsRepository.findProducts()
  }

  async getProductById(id: number) {
    const product = await this.productsRepository.findProductById(id)

    if(!product) throw new NotFoundException("Product not found!")

    return product
  }
}
