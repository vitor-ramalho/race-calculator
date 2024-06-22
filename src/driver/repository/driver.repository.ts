import { Injectable } from '@nestjs/common';
import { IDriverRepository } from './driver-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../entities/driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverTypeOrmRepository implements IDriverRepository {
  constructor(
    @InjectRepository(Driver)
    private typeOrmRepo: Repository<Driver>,
  ) {}

  async create(driver: Driver): Promise<void> {
    await this.typeOrmRepo.save(driver);
  }

  async update(driver: Driver): Promise<void> {
    await this.typeOrmRepo.update(driver.id, driver);
  }

  findById(id: number): Promise<Driver> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }

  findAll(): Promise<Driver[]> {
    return this.typeOrmRepo.find();
  }

  async delete(id: number): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }
}
