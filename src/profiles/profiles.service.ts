import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(profile: CreateProfileDto) {
    return await this.profileRepository.save(profile);
  }

  async findOne(id: number) {
    return await this.profileRepository.findBy({ id });
  }

  async update(id: number, profile: UpdateProfileDto) {
    return await this.profileRepository.update(id, profile);
  }
}
