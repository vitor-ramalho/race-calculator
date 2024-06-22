import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { DriverTypeOrmRepository } from './repository/driver.repository';
import { CreateDriverUseCase } from './use-cases/create-driver.use-case';
import { FindDriverUseCase } from './use-cases/find-driver.use-case';
import { FindDriversUseCase } from './use-cases/find-drivers.use-case';
import { UpdateDriverUseCase } from './use-cases/update-driver.use-case';
import { DeleteDriverUseCase } from './use-cases/delete-driver.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  controllers: [DriverController],
  providers: [
    CreateDriverUseCase,
    FindDriverUseCase,
    FindDriversUseCase,
    UpdateDriverUseCase,
    DeleteDriverUseCase,
    DriverTypeOrmRepository,
    {
      provide: 'IDriverRepository',
      useExisting: DriverTypeOrmRepository,
    },
  ],
})
export class DriverModule {}
