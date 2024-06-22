import { Test } from '@nestjs/testing';
import { FindPassengersUseCase } from './find-passengers.use-case';
import { IPassengerRepository } from '../repository/passenger-repository.interface';
import { Passenger } from '../entities/passenger.entity';

describe('Find Passengers', () => {
  let findPassengersUseCase: FindPassengersUseCase;
  let mockPassengerRepo: IPassengerRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindPassengersUseCase,
        {
          provide: 'IPassengerRepository',
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    findPassengersUseCase = moduleRef.get<FindPassengersUseCase>(
      FindPassengersUseCase,
    );
    mockPassengerRepo = moduleRef.get<IPassengerRepository>(
      'IPassengerRepository',
    );
  });

  it('should return all drivers', async () => {
    const expectedDrivers: Passenger[] = [
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

    mockPassengerRepo.findAll = jest.fn().mockResolvedValue(expectedDrivers);

    const drivers = await findPassengersUseCase.execute();

    expect(drivers).toEqual(expectedDrivers);
    expect(mockPassengerRepo.findAll).toHaveBeenCalled();
  });
});
