import { IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  full_address?: string;

  @IsOptional()
  photo?: string;
}
