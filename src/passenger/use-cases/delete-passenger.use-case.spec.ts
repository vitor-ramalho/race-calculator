import { Test } from '@nestjs/testing';
import { DeletePassengerUseCase } from './delete-passenger.use-case';
import { IPassengerRepository } from '../repository/passenger-repository.interface';
import { Passenger } from '../entities/passenger.entity';

describe('Delete Passenger', () => {
  let deletePassengerUseCase: DeletePassengerUseCase;
  let mockPassengerRepo: IPassengerRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeletePassengerUseCase,
        {
          provide: 'IPassengerRepository',
          useValue: {
            findById: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    deletePassengerUseCase = moduleRef.get<DeletePassengerUseCase>(
      DeletePassengerUseCase,
    );
    mockPassengerRepo = moduleRef.get<IPassengerRepository>(
      'IPassengerRepository',
    );
  });

  it('should delete an passenger', async () => {
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

    await deletePassengerUseCase.execute(passengerId);

    expect(mockPassengerRepo.findById).toHaveBeenCalledWith(passengerId);
    expect(mockPassengerRepo.delete).toHaveBeenCalledWith(passengerId);
  });
});
