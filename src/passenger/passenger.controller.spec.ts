import { Test, TestingModule } from '@nestjs/testing';
import { PassengerController } from './passenger.controller';
import { CreatePassengerUseCase } from './use-cases/create-passenger.use-case';
import { FindPassengerUseCase } from './use-cases/find-passenger.use-case';
import { FindPassengersUseCase } from './use-cases/find-passengers.use-case';
import { UpdatePassengerUseCase } from './use-cases/update-passenger.use-case';
import { DeletePassengerUseCase } from './use-cases/delete-passenger.use-case';
import { Passenger } from './entities/passenger.entity';
import { CreatePassengerDto } from './dto/create-passenger.dto';

describe('Passenger Controller', () => {
  let controller: PassengerController;
  let createPassengerUseCase: CreatePassengerUseCase;
  let findPassengerUseCase: FindPassengerUseCase;
  let findPassengersUseCase: FindPassengersUseCase;
  let updatePassengerUseCase: UpdatePassengerUseCase;
  let deletePassengerUseCase: DeletePassengerUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassengerController],
      providers: [
        { provide: FindPassengerUseCase, useValue: { execute: jest.fn() } },
        { provide: CreatePassengerUseCase, useValue: { execute: jest.fn() } },
        { provide: FindPassengersUseCase, useValue: { execute: jest.fn() } },
        { provide: UpdatePassengerUseCase, useValue: { execute: jest.fn() } },
        { provide: DeletePassengerUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<PassengerController>(PassengerController);
    createPassengerUseCase = module.get<CreatePassengerUseCase>(
      CreatePassengerUseCase,
    );
    findPassengersUseCase = module.get<FindPassengersUseCase>(
      FindPassengersUseCase,
    );
    findPassengerUseCase =
      module.get<FindPassengerUseCase>(FindPassengerUseCase);
    updatePassengerUseCase = module.get<UpdatePassengerUseCase>(
      UpdatePassengerUseCase,
    );
    deletePassengerUseCase = module.get<DeletePassengerUseCase>(
      DeletePassengerUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call CreatePassengerUseCase with correct parameters', async () => {
      const dto: CreatePassengerDto = {
        name: 'John Doe',
        cpf: '12345678900',
        birth_date: '2010-08-17 12:09:36',
        address: 'Rua A, 123',
        gender: 'M',
      };
      await controller.create(dto);
      expect(createPassengerUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of passengers', async () => {
      const passengers = [
        {
          id: 1,
          name: 'John Doe',
          cpf: '12345678900',
          birth_date: '2010-08-17 12:09:36',
          address: 'Rua A, 123',
          gender: 'M',
        },
        {
          id: 2,
          name: 'Jane Doe',
          cpf: '12345678901',
          birth_date: '2010-08-17 12:09:36',
          address: 'Rua B, 123',
          gender: 'F',
        },
      ];

      jest
        .spyOn(findPassengersUseCase, 'execute')
        .mockResolvedValue(passengers);
      expect(await controller.findAll()).toEqual(passengers);
    });
  });

  describe('find By ID', () => {
    it('should return one passenger by the id', async () => {
      const passenger = {
        id: 1,
        name: 'John Doe',
        cpf: '12345678900',
        birth_date: '2010-08-17 12:09:36',
        address: 'Rua A, 123',
        gender: 'M',
      };

      jest.spyOn(findPassengerUseCase, 'execute').mockResolvedValue(passenger);
      expect(await controller.findOne(passenger.id)).toEqual(passenger);
    });
  });

  describe('Update Passenger', () => {
    it('should update one passenger', async () => {
      const passengerId = 1;
      const passenger: Passenger = {
        id: passengerId,
        name: 'John Doe',
        cpf: '12345678900',
        birth_date: '2010-08-17 12:09:36',
        gender: 'M',
        address: 'Rua A, 123',
      };
      const updatedPassenger: Passenger = {
        id: 1,
        name: 'John Doe Updated',
        cpf: '12345678900',
        birth_date: '2010-08-17 12:09:36',
        gender: 'M',
        address: 'Rua A, 123',
      };

      jest.spyOn(findPassengerUseCase, 'execute').mockResolvedValue(passenger);
      jest
        .spyOn(updatePassengerUseCase, 'execute')
        .mockResolvedValue(updatedPassenger);

      expect(await controller.findOne(passenger.id)).toEqual(passenger);
      expect(await controller.update(updatedPassenger, passenger.id)).toEqual(
        updatedPassenger,
      );
    });
  });

  describe('Delete Passenger', () => {
    it('should delete one passenger', async () => {
      const passengerId = 1;
      const passenger: Passenger = {
        id: passengerId,
        name: 'John Doe',
        cpf: '12345678900',
        birth_date: '2010-08-17 12:09:36',
        gender: 'M',
        address: 'Rua A, 123',
      };

      jest.spyOn(findPassengerUseCase, 'execute').mockResolvedValue(passenger);
      jest.spyOn(deletePassengerUseCase, 'execute').mockResolvedValue();

      await controller.remove(passenger.id);
      expect(deletePassengerUseCase.execute).toHaveBeenCalledWith(passenger.id);
    });
  });
});
