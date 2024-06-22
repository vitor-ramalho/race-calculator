import { Inject, Injectable } from '@nestjs/common';
import { IDriverRepository } from '../repository/driver-repository.interface';

@Injectable()
export class FindDriversUseCase {
  constructor(
    @Inject('IDriverRepository')
    private readonly driverRepo: IDriverRepository,
  ) {}

  execute() {
    return this.driverRepo.findAll();
  }
}
