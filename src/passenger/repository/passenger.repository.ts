import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPassengerRepository } from './passenger-repository.interface';
import { Passenger } from '../entities/passenger.entity';

@Injectable()
export class PassengerTypeOrmRepository implements IPassengerRepository {
  constructor(
    @InjectRepository(Passenger)
    private typeOrmRepo: Repository<Passenger>,
  ) {}

  async create(passenger: Passenger): Promise<void> {
    await this.typeOrmRepo.save(passenger);
  }

  async update(passenger: Passenger): Promise<void> {
    await this.typeOrmRepo.update(passenger.id, passenger);
  }

  findById(id: number): Promise<Passenger> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }

  findAll(): Promise<Passenger[]> {
    return this.typeOrmRepo.find();
  }

  async delete(id: number): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }
}
