import { Test } from '@nestjs/testing';
import { FindPassengerUseCase } from './find-passenger.use-case';
import { IPassengerRepository } from '../repository/passenger-repository.interface';
import { Passenger } from '../entities/passenger.entity';

describe('FindDriverUseCase', () => {
  let findPassengerUseCase: FindPassengerUseCase;
  let mockPassengerRepo: IPassengerRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FindPassengerUseCase,
        {
          provide: 'IPassengerRepository',
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    findPassengerUseCase =
      moduleRef.get<FindPassengerUseCase>(FindPassengerUseCase);
    mockPassengerRepo = moduleRef.get<IPassengerRepository>(
      'IPassengerRepository',
    );
  });

  it('should return a passenger by id', async () => {
    const passengerId = 1;
    const expectedPassenger: Passenger = {
      id: passengerId,
      name: 'John Doe',
      cpf: '12345678900',
      birth_date: '2010-08-17 12:09:36',
      gender: 'M',
      address: 'Rua A, 123',
    };

    mockPassengerRepo.findById = jest.fn().mockResolvedValue(expectedPassenger);

    const driver = await findPassengerUseCase.execute(passengerId);

    expect(driver).toEqual(expectedPassenger);
    expect(mockPassengerRepo.findById).toHaveBeenCalledWith(passengerId);
  });
});
