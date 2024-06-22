import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { IsCPF } from '../../utils/isCpf.validator';

export class CreatePassengerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsCPF({ message: 'Invalid CPF' })
  cpf: string;

  @IsNotEmpty()
  @IsDateString()
  birth_date: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}
