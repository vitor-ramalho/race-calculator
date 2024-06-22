import { Inject, Injectable } from '@nestjs/common';
import { IPassengerRepository } from '../repository/passenger-repository.interface';

@Injectable()
export class FindPassengersUseCase {
  constructor(
    @Inject('IPassengerRepository')
    private readonly passengerRepo: IPassengerRepository,
  ) {}

  execute() {
    return this.passengerRepo.findAll();
  }
}
