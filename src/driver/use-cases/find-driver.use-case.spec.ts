import { CreateDriverUseCase } from './create-driver.use-case';
import { IDriverRepository } from '../repository/driver-repository.interface';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { Driver } from '../entities/driver.entity';
import { Test } from '@nestjs/testing';
import { FindDriverUseCase } from './find-driver.use-case';

describe('FindDriverUseCase', () => {
  let findDriverUseCase: FindDriverUseCase;
  let mockDriverRepo: IDriverRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindDriverUseCase,
        {
          provide: 'IDriverRepository',
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    findDriverUseCase = moduleRef.get<FindDriverUseCase>(FindDriverUseCase);
    mockDriverRepo = moduleRef.get<IDriverRepository>('IDriverRepository');
  });

  it('should return driver by id', async () => {
    const driverId = 1;
    const expectedDriver: Driver = {
      id: driverId,
      name: 'John Doe',
      cpf: '12345678900',
      birth_date: '2010-08-17 12:09:36',
      gender: 'M',
      address: 'Rua A, 123',
    };

    mockDriverRepo.findById = jest.fn().mockResolvedValue(expectedDriver);

    const driver = await findDriverUseCase.execute(driverId);

    expect(driver).toEqual(expectedDriver);
    expect(mockDriverRepo.findById).toHaveBeenCalledWith(driverId);
  });
});
