import { Test } from '@nestjs/testing';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import { IPassengerRepository } from '../repository/passenger-repository.interface';
import { CreatePassengerUseCase } from './create-passenger.use-case';
import { Passenger } from '../entities/passenger.entity';

describe('CreateDriverUseCase', () => {
  let createPassengerUseCase: CreatePassengerUseCase;
  let mockPassengerRepo: IPassengerRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreatePassengerUseCase,
        {
          provide: 'IPassengerRepository',
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createPassengerUseCase = moduleRef.get<CreatePassengerUseCase>(
      CreatePassengerUseCase,
    );
    mockPassengerRepo = moduleRef.get<IPassengerRepository>(
      'IPassengerRepository',
    );
  });

  it('should create a driver', async () => {
    const passengerDto = new CreatePassengerDto();
    const passenger = new Passenger(passengerDto);

    const result = await createPassengerUseCase.execute(passengerDto);

    expect(mockPassengerRepo.create).toHaveBeenCalledWith(passenger);
    expect(result).toEqual(passenger);
  });
});
