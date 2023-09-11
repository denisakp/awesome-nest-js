import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { UpdateProfileDto } from 'src/profiles/dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(createUSerDto: CreateUserDto) {
    const user = await this.userRepository.save(createUSerDto);

    const profile = new Profile();
    profile.full_address = createUSerDto.full_address;
    profile.photo = createUSerDto.photo;
    profile.user = user;

    await this.profileRepository.save(profile);

    return this.findOne(user.id);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findBy({ email });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });

    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async update(id: number, update: UpdateUserDto) {
    return await this.userRepository.update(id, { ...update });
  }

  async profile(id: number, update: UpdateProfileDto) {
    const user = await this.findOne(id);

    return await this.profileRepository.update(user.profile.id, update);
  }
}
