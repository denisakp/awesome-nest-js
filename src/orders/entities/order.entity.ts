import { OrderStatus } from 'src/enums/order.status';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PLACED })
  status: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @CreateDateColumn()
  created_datetime?: Date;
}
