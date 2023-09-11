import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  full_address?: string;

  @Column({ nullable: true })
  photo?: string;

  @OneToOne(() => User, (user) => user.profile) // specify inverse side as a second parameter
  @JoinColumn()
  user: User;
}
