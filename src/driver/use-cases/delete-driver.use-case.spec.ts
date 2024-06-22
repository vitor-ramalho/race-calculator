import { IDriverRepository } from '../repository/driver-repository.interface';
import { Driver } from '../entities/driver.entity';
import { Test } from '@nestjs/testing';
import { DeleteDriverUseCase } from './delete-driver.use-case';

describe('DeleteDriverUseCase', () => {
  let deleteDriverUseCase: DeleteDriverUseCase;
  let mockDriverRepo: IDriverRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DeleteDriverUseCase,
        {
          provide: 'IDriverRepository',
          useValue: {
            findById: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteDriverUseCase =
      moduleRef.get<DeleteDriverUseCase>(DeleteDriverUseCase);
    mockDriverRepo = moduleRef.get<IDriverRepository>('IDriverRepository');
  });

  it('should delete an driver', async () => {
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

    await deleteDriverUseCase.execute(driverId);

    expect(mockDriverRepo.findById).toHaveBeenCalledWith(driverId);
    expect(mockDriverRepo.delete).toHaveBeenCalledWith(driverId);
  });
});
