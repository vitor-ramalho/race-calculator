import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsOptional, IsString } from 'class-validator';
import { IsCPF } from '../../utils/isCpf.validator';

class _UpdatePassengerDto {
  id?: number;
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsCPF({ message: 'Invalid CPF' })
  cpf?: string;

  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;
}

export class UpdatePassengerDto extends PartialType(_UpdatePassengerDto) {}
