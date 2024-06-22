import { Passenger } from '../entities/passenger.entity';

export interface IPassengerRepository {
  create(passenger: Passenger): Promise<void>;
  update(passenger: Passenger): Promise<void>;
  findById(id: number): Promise<Passenger>;
  findAll(): Promise<Passenger[]>;
  delete(id: number): Promise<void>;
}
