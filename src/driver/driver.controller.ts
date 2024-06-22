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
import { FindDriverUseCase } from './use-cases/find-driver.use-case';
import { CreateDriverUseCase } from './use-cases/create-driver.use-case';
import { FindDriversUseCase } from './use-cases/find-drivers.use-case';
import { UpdateDriverUseCase } from './use-cases/update-driver.use-case';
import { DeleteDriverUseCase } from './use-cases/delete-driver.use-case';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
  @Inject(FindDriverUseCase)
  private readonly findDriverUseCase: FindDriverUseCase;

  @Inject(FindDriversUseCase)
  private readonly findDriversUseCase: FindDriversUseCase;

  @Inject(CreateDriverUseCase)
  private readonly createDriverUseCase: CreateDriverUseCase;

  @Inject(UpdateDriverUseCase)
  private readonly updateDriverUseCase: UpdateDriverUseCase;

  @Inject(DeleteDriverUseCase)
  private readonly deleteDriverUseCase: DeleteDriverUseCase;

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.createDriverUseCase.execute(createDriverDto);
  }

  @Get()
  findAll() {
    return this.findDriversUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.findDriverUseCase.execute(id);
  }

  @Patch(':id')
  update(@Body() updateDriverDto: UpdateDriverDto, @Param('id') id: number) {
    return this.updateDriverUseCase.execute(id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deleteDriverUseCase.execute(id);
  }
}
