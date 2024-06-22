import { CreateDriverUseCase } from './create-driver.use-case';
import { IDriverRepository } from '../repository/driver-repository.interface';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { Driver } from '../entities/driver.entity';
import { Test } from '@nestjs/testing';
import { FindDriverUseCase } from './find-driver.use-case';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { UpdateDriverUseCase } from './update-driver.use-case';

describe('UpdateDriverUseCase', () => {
  let updateDriverUseCase: UpdateDriverUseCase;
  let mockDriverRepo: IDriverRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdateDriverUseCase,
        {
          provide: 'IDriverRepository',
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    updateDriverUseCase =
      moduleRef.get<UpdateDriverUseCase>(UpdateDriverUseCase);
    mockDriverRepo = moduleRef.get<IDriverRepository>('IDriverRepository');
  });

  it('should update a driver', async () => {
    const driverId = 1;
    const expectedDriver: Driver = {
      id: driverId,
      name: 'John Doe',
      cpf: '12345678900',
      birth_date: '2010-08-17 12:09:36',
      gender: 'M',
      address: 'Rua A, 123',
    };
    const updatedDriver: UpdateDriverDto = {
      name: 'John Doe Updated',
      cpf: '12345678900',
      birth_date: '2010-08-17 12:09:36',
      gender: 'M',
      address: 'Rua A, 123',
    };

    mockDriverRepo.findById = jest.fn().mockResolvedValue(expectedDriver);

    const driver = await updateDriverUseCase.execute(driverId, updatedDriver);

    expect(driver).toEqual(expectedDriver);
    expect(mockDriverRepo.findById).toHaveBeenCalledWith(driverId);
  });
});
