import { Inject, Injectable } from '@nestjs/common';
import { IDriverRepository } from '../repository/driver-repository.interface';

@Injectable()
export class FindDriverUseCase {
  constructor(
    @Inject('IDriverRepository')
    private readonly driverRepo: IDriverRepository,
  ) {}

  execute(id: number) {
    return this.driverRepo.findById(id);
  }
}
