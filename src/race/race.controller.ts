import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateFareDto } from './dto/create-fare.dto';
import { CreateFareUseCase } from './use-cases/fare.use-case';
@Controller('')
export class RaceController {
  @Inject(CreateFareUseCase)
  private readonly createFareUseCase: CreateFareUseCase;

  @Post()
  create(@Body() createFareDto: CreateFareDto) {
    this.createFareUseCase.execute(createFareDto);
  }
}
