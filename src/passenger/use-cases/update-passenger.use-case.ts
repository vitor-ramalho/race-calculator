import { Inject, Injectable } from '@nestjs/common';
import { IPassengerRepository } from '../repository/passenger-repository.interface';
import { UpdatePassengerDto } from '../dto/update-passenger.dto';

@Injectable()
export class UpdatePassengerUseCase {
  constructor(
    @Inject('IPassengerRepository')
    private readonly passengerRepo: IPassengerRepository,
  ) {}

  async execute(id: number, input: UpdatePassengerDto) {
    const existingPassenger = await this.passengerRepo.findById(id);

    if (!existingPassenger) {
      throw new Error('Driver not found');
    }

    const updatedPassenger = Object.assign(existingPassenger, input);
    await this.passengerRepo.update(updatedPassenger);

    return updatedPassenger;
  }
}
