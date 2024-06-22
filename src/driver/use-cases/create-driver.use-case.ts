import { Inject, Injectable } from '@nestjs/common';
import { IDriverRepository } from '../repository/driver-repository.interface';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { Driver } from '../entities/driver.entity';

@Injectable()
export class CreateDriverUseCase {
  constructor(
    @Inject('IDriverRepository')
    private readonly driverRepo: IDriverRepository,
  ) {}

  async execute(input: CreateDriverDto) {
    const driver = new Driver(input);
    await this.driverRepo.create(driver);
    return driver;
  }
}
