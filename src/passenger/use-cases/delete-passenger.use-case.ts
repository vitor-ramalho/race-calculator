import { Inject, Injectable } from '@nestjs/common';
import { IPassengerRepository } from '../repository/passenger-repository.interface';

@Injectable()
export class DeletePassengerUseCase {
  constructor(
    @Inject('IPassengerRepository')
    private readonly passengerRepo: IPassengerRepository,
  ) {}

  async execute(id: number) {
    const existingPassenger = await this.passengerRepo.findById(id);

    if (!existingPassenger) {
      throw new Error('Driver not found');
    }
    await this.passengerRepo.delete(id);
  }
}
