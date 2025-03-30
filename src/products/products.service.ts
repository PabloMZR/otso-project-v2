import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { retry } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ){}
  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: 'Sabritas',
      price: 29,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: 'Coca Cola 600ml',
      price: 40,
      countSeal: 2,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName: 'Agua Ciel 1lt',
      price: 15,
      countSeal: 2,
      provider: uuid(),
    }
  ];
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto)
    return product
    /*if (!createProductDto.productId) createProductDto.productId = uuid()
    createProductDto.productId = uuid()
    this.products.push(createProductDto)
    */

  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productId: id,
    })
    if (!product) throw new NotFoundException()
    return product
  }

  findByProvider(id: string) {
    const productsFound = this.products.filter((product) => product.provider === id)
    if(productsFound.length === 0) throw new NotFoundException()
    return productsFound
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto,
    })
    if(!productToUpdate) throw new NotFoundException()
    this.productRepository.save(productToUpdate)
    return productToUpdate
  }

  async remove(id: string) {
    const result = await this.productRepository.delete({ productId: id });

    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID: ${id} no encontrado`);
    }

    return {
      message: `Producto con ID: ${id} eliminado`,
    };
  }
}
