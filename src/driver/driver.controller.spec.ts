import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from './driver.controller';
import { FindDriverUseCase } from './use-cases/find-driver.use-case';
import { CreateDriverUseCase } from './use-cases/create-driver.use-case';
import { FindDriversUseCase } from './use-cases/find-drivers.use-case';
import { UpdateDriverUseCase } from './use-cases/update-driver.use-case';
import { DeleteDriverUseCase } from './use-cases/delete-driver.use-case';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';

describe('DriverController', () => {
  let controller: DriverController;
  let createDriverUseCase: CreateDriverUseCase;
  let findDriverUseCase: FindDriverUseCase;
  let findDriversUseCase: FindDriversUseCase;
  let updateDriverUseCase: UpdateDriverUseCase;
  let deleteDriverUseCase: DeleteDriverUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [
        { provide: FindDriverUseCase, useValue: { execute: jest.fn() } },
        { provide: CreateDriverUseCase, useValue: { execute: jest.fn() } },
        { provide: FindDriversUseCase, useValue: { execute: jest.fn() } },
        { provide: UpdateDriverUseCase, useValue: { execute: jest.fn() } },
        { provide: DeleteDriverUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<DriverController>(DriverController);
    createDriverUseCase = module.get<CreateDriverUseCase>(CreateDriverUseCase);
    findDriversUseCase = module.get<FindDriversUseCase>(FindDriversUseCase);
    findDriverUseCase = module.get<FindDriverUseCase>(FindDriverUseCase);
    updateDriverUseCase = module.get<UpdateDriverUseCase>(UpdateDriverUseCase);
    deleteDriverUseCase = module.get<DeleteDriverUseCase>(DeleteDriverUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call CreateDriverUseCase with correct parameters', async () => {
      const dto: CreateDriverDto = {
        name: 'John Doe',
        cpf: '11144477725',
        birth_date: '2010-08-17 12:09:36',
        address: 'Rua A, 123',
        gender: 'M',
      };
      await controller.create(dto);
      expect(createDriverUseCase.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of drivers', async () => {
      const drivers = [
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

      jest.spyOn(findDriversUseCase, 'execute').mockResolvedValue(drivers);
      expect(await controller.findAll()).toEqual(drivers);
    });
  });

  describe('find By ID', () => {
    it('should return one driver by the id', async () => {
      const driver = {
        id: 1,
        name: 'John Doe',
        cpf: '12345678900',
        birth_date: '2010-08-17 12:09:36',
        address: 'Rua A, 123',
        gender: 'M',
      };

      jest.spyOn(findDriverUseCase, 'execute').mockResolvedValue(driver);
      expect(await controller.findOne(driver.id)).toEqual(driver);
    });
  });

  describe('Update Driver', () => {
    it('should update one driver', async () => {
      const driverId = 1;
      const driver: Driver = {
        id: driverId,
        name: 'John Doe',
        cpf: '12345678900',
        birth_date: '2010-08-17 12:09:36',
        gender: 'M',
        address: 'Rua A, 123',
      };
      const updatedDriver: Driver = {
        id: 1,
        name: 'John Doe Updated',
        cpf: '12345678900',
        birth_date: '2010-08-17 12:09:36',
        gender: 'M',
        address: 'Rua A, 123',
      };

      jest.spyOn(findDriverUseCase, 'execute').mockResolvedValue(driver);
      jest
        .spyOn(updateDriverUseCase, 'execute')
        .mockResolvedValue(updatedDriver);

      expect(await controller.findOne(driver.id)).toEqual(driver);
      expect(await controller.update(updatedDriver, driver.id)).toEqual(
        updatedDriver,
      );
    });
  });

  describe('Delete Driver', () => {
    it('should delete one driver', async () => {
      const driverId = 1;
      const driver: Driver = {
        id: driverId,
        name: 'John Doe',
        cpf: '12345678900',
        birth_date: '2010-08-17 12:09:36',
        gender: 'M',
        address: 'Rua A, 123',
      };

      jest.spyOn(findDriverUseCase, 'execute').mockResolvedValue(driver);
      jest.spyOn(deleteDriverUseCase, 'execute').mockResolvedValue();

      await controller.remove(driver.id);
      expect(deleteDriverUseCase.execute).toHaveBeenCalledWith(driver.id);
    });
  });
});
