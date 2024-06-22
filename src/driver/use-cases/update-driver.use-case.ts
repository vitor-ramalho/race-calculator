import { Inject, Injectable } from '@nestjs/common';
import { IDriverRepository } from '../repository/driver-repository.interface';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { Driver } from '../entities/driver.entity';

@Injectable()
export class UpdateDriverUseCase {
  constructor(
    @Inject('IDriverRepository')
    private readonly driverRepo: IDriverRepository,
  ) {}

  async execute(id: number, input: UpdateDriverDto) {
    const existingDriver = await this.driverRepo.findById(id);

    if (!existingDriver) {
      throw new Error('Driver not found');
    }

    const updatedDriver = Object.assign(existingDriver, input);
    await this.driverRepo.update(updatedDriver);

    return updatedDriver;
  }
}
