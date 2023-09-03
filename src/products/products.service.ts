import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private lastProductId = 0;
  private products = [];

  create(createProductDto: CreateProductDto): Product {
    const newProduct = { id: ++this.lastProductId, ...createProductDto };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex > -1) {
      this.products[productIndex] = updateProductDto;
      return updateProductDto;
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );

    if (productIndex > -1) {
      this.products.splice(productIndex, 1);
    }
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
  }
}
