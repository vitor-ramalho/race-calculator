import { IDriverRepository } from '../repository/driver-repository.interface';
import { Driver } from '../entities/driver.entity';
import { Test } from '@nestjs/testing';
import { FindDriversUseCase } from './find-drivers.use-case';

describe('FindDriverUseCase', () => {
  let findDriversUseCase: FindDriversUseCase;
  let mockDriverRepo: IDriverRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindDriversUseCase,
        {
          provide: 'IDriverRepository',
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    findDriversUseCase = moduleRef.get<FindDriversUseCase>(FindDriversUseCase);
    mockDriverRepo = moduleRef.get<IDriverRepository>('IDriverRepository');
  });

  it('should return all drivers', async () => {
    const expectedDrivers: Driver[] = [
      {
        id: 1,
        name: 'John Doe',
        cpf: '12345678900',
        birth_date: '2010-08-17 12:09:36',
        gender: 'M',
        address: 'Rua A, 123',
      },
      {
        id: 2,
        name: 'John Doe',
        cpf: '12345678900',
        birth_date: '2010-08-17 12:09:36',
        gender: 'M',
        address: 'Rua A, 123',
      },
    ];

    mockDriverRepo.findAll = jest.fn().mockResolvedValue(expectedDrivers);

    const drivers = await findDriversUseCase.execute();

    expect(drivers).toEqual(expectedDrivers);
    expect(mockDriverRepo.findAll).toHaveBeenCalled();
  });
});
