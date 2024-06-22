import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsDateString, IsOptional, IsString } from 'class-validator';
import { IsCPF } from '../../utils/isCpf.validator';

class _UpdateDriverDto {
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

export class UpdateDriverDto extends PartialType(_UpdateDriverDto) {}
