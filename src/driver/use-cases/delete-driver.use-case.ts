import { Inject, Injectable } from '@nestjs/common';
import { IDriverRepository } from '../repository/driver-repository.interface';

@Injectable()
export class DeleteDriverUseCase {
  constructor(
    @Inject('IDriverRepository')
    private readonly driverRepo: IDriverRepository,
  ) {}

  async execute(id: number) {
    const existingDriver = await this.driverRepo.findById(id);

    if (!existingDriver) {
      throw new Error('Driver not found');
    }
    await this.driverRepo.delete(id);
  }
}
