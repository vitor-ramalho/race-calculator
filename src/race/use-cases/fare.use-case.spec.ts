import { Test } from '@nestjs/testing';
import { CreateFareDto } from '../dto/create-fare.dto';
import { CreateFareUseCase } from './fare.use-case';

describe('CreateFareUseCase', () => {
  let createFareUseCase: CreateFareUseCase;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CreateFareUseCase],
    }).compile();

    createFareUseCase = moduleRef.get<CreateFareUseCase>(CreateFareUseCase);
  });

  it('should calculate fare', async () => {
    const fareDto = new CreateFareDto();
    fareDto.date = new Date();
    fareDto.currentLat = 40.7128;
    fareDto.currentLng = -74.006;
    fareDto.destinationLat = 40.706;
    fareDto.destinationLng = -74.008;

    const result = await createFareUseCase.execute(fareDto);

    console.log(result);

    expect(result.price).toBeDefined();
    expect(result.requestId).toBeDefined();
  });
});
