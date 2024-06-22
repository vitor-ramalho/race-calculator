import { CreateDriverUseCase } from './create-driver.use-case';
import { IDriverRepository } from '../repository/driver-repository.interface';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { Driver } from '../entities/driver.entity';
import { Test } from '@nestjs/testing';
import { IsCPF } from '../../utils/isCpf.validator';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { error } from 'console';
import { ValidationPipe } from '@nestjs/common';

describe('CreateDriverUseCase', () => {
  let createDriverUseCase: CreateDriverUseCase;
  let mockDriverRepo: IDriverRepository;
  let validationPipe: ValidationPipe;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateDriverUseCase,
        {
          provide: 'IDriverRepository',
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    validationPipe = new ValidationPipe();
    createDriverUseCase =
      moduleRef.get<CreateDriverUseCase>(CreateDriverUseCase);
    mockDriverRepo = moduleRef.get<IDriverRepository>('IDriverRepository');
  });

  it('should create a driver', async () => {
    const dto = new CreateDriverDto();
    dto.name = 'John Doe';
    dto.cpf = '99416267074';
    dto.birth_date = '2010-08-17 12:09:36';
    dto.gender = 'Male';
    dto.address = '123 Street';

    console.log(dto);
    const errors = await validate(dto);
    console.log(errors);

    const validatedDto = await validationPipe.transform(dto, {
      type: 'body',
      metatype: CreateDriverDto,
    });

    const result = await createDriverUseCase.execute(validatedDto);

    expect(mockDriverRepo.create).toHaveBeenCalled();

    expect(mockDriverRepo.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(dto);
  });

  it('should throw an error with invalid data', async () => {
    const dto = new CreateDriverDto();
    dto.name = 'John Doe';
    dto.cpf = '12345678901';
    dto.birth_date = '2010-08-17 12:09:36';
    dto.gender = 'Male';
    dto.address = '123 Street';

    try {
      const validateDto = await validationPipe.transform(dto, {
        type: 'body',
        metatype: CreateDriverDto,
      });
      const result = await createDriverUseCase.execute(validateDto);
      console.log(result);
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
