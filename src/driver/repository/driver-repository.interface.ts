import { Driver } from '../entities/driver.entity';

export interface IDriverRepository {
  create(driver: Driver): Promise<void>;
  update(driver: Driver): Promise<void>;
  findById(id: number): Promise<Driver>;
  findAll(): Promise<Driver[]>;
  delete(id: number): Promise<void>;
}
