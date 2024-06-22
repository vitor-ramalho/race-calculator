import { Inject, Injectable } from '@nestjs/common';
import { IPassengerRepository } from '../repository/passenger-repository.interface';

@Injectable()
export class FindPassengerUseCase {
  constructor(
    @Inject('IPassengerRepository')
    private readonly driverRepo: IPassengerRepository,
  ) {}

  execute(id: number) {
    return this.driverRepo.findById(id);
  }
}
