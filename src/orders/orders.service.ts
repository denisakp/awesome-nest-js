import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto) {
    const user = await this.userService.findOne(userId);

    const order = new Order();
    order.amount = createOrderDto.amount;
    order.user = user;

    const products = [];

    for (const product of createOrderDto.products) {
      try {
        const dbProduct = await this.productService.findOne(product);
        products.push(dbProduct);
      } catch (error) {
        // We'll update this later
        console.log('failed to find product with id ' + product);
      }
    }

    order.products = products;

    return await this.orderRepository.save(order);
  }

  async findAll(userId: number): Promise<Order[]> {
    const user = await this.userService.findOne(userId);
    return await this.orderRepository.find({
      where: { user },
    });
  }

  async findOne(id: number): Promise<Order | null> {
    return await this.orderRepository.findOne({
      relations: {
        products: true,
      },
      where: { id },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(id, updateOrderDto);
  }

  async remove(id: number) {
    return await this.orderRepository.delete(id);
  }
}
