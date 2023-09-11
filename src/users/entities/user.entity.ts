import { UserRole } from 'src/enums/user.role';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CUSTOMER })
  role: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
