import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FindPassengerUseCase } from './use-cases/find-passenger.use-case';
import { FindPassengersUseCase } from './use-cases/find-passengers.use-case';
import { CreatePassengerUseCase } from './use-cases/create-passenger.use-case';
import { UpdatePassengerUseCase } from './use-cases/update-passenger.use-case';
import { DeletePassengerUseCase } from './use-cases/delete-passenger.use-case';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';

@Controller('passenger')
export class PassengerController {
  @Inject(FindPassengerUseCase)
  private readonly findPassengerUseCase: FindPassengerUseCase;

  @Inject(FindPassengersUseCase)
  private readonly findPassengersUseCase: FindPassengersUseCase;

  @Inject(CreatePassengerUseCase)
  private readonly createPassengerUseCase: CreatePassengerUseCase;

  @Inject(UpdatePassengerUseCase)
  private readonly updatePassengerUseCase: UpdatePassengerUseCase;

  @Inject(DeletePassengerUseCase)
  private readonly deletePassengerUseCase: DeletePassengerUseCase;

  @Post()
  create(@Body() createPassengerDto: CreatePassengerDto) {
    return this.createPassengerUseCase.execute(createPassengerDto);
  }
  @Get()
  findAll() {
    return this.findPassengersUseCase.execute();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.findPassengerUseCase.execute(id);
  }
  @Patch(':id')
  update(
    @Body() updatePassengerDto: UpdatePassengerDto,
    @Param('id') id: number,
  ) {
    return this.updatePassengerUseCase.execute(id, updatePassengerDto);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deletePassengerUseCase.execute(id);
  }
}
