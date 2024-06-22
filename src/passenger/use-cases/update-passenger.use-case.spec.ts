import { Test } from '@nestjs/testing';
import { UpdatePassengerUseCase } from './update-passenger.use-case';
import { IPassengerRepository } from '../repository/passenger-repository.interface';
import { Passenger } from '../entities/passenger.entity';
import { UpdatePassengerDto } from '../dto/update-passenger.dto';
describe('Update Passenger', () => {
  let updatePassengerUseCase: UpdatePassengerUseCase;
  let mockPassengerRepository: IPassengerRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UpdatePassengerUseCase,
        {
          provide: 'IPassengerRepository',
          useValue: {
            findById: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    updatePassengerUseCase = moduleRef.get<UpdatePassengerUseCase>(
      UpdatePassengerUseCase,
    );
    mockPassengerRepository = moduleRef.get<IPassengerRepository>(
      'IPassengerRepository',
    );
  });

  it('should update a passenger', async () => {
    const passengerId = 1;
    const expectedPassenger: Passenger = {
      id: passengerId,
      name: 'John Doe',
      cpf: '12345678900',
      birth_date: '2010-08-17 12:09:36',
      gender: 'M',
      address: 'Rua A, 123',
    };
    const updatedPassenger: UpdatePassengerDto = {
      name: 'John Doe Updated',
      cpf: '12345678900',
      birth_date: '2010-08-17 12:09:36',
      gender: 'M',
      address: 'Rua A, 123',
    };

    mockPassengerRepository.findById = jest
      .fn()
      .mockResolvedValue(expectedPassenger);

    const driver = await updatePassengerUseCase.execute(
      passengerId,
      updatedPassenger,
    );

    expect(driver).toEqual(expectedPassenger);
    expect(mockPassengerRepository.findById).toHaveBeenCalledWith(passengerId);
  });
});
