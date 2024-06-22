import { Inject, Injectable } from '@nestjs/common';
import { IPassengerRepository } from '../repository/passenger-repository.interface';
import { Passenger } from '../entities/passenger.entity';
import { CreatePassengerDto } from '../dto/create-passenger.dto';

@Injectable()
export class CreatePassengerUseCase {
  constructor(
    @Inject('IPassengerRepository')
    private readonly passengerRepo: IPassengerRepository,
  ) {}

  async execute(input: CreatePassengerDto) {
    const driver = new Passenger(input);
    await this.passengerRepo.create(driver);
    return driver;
  }
}
