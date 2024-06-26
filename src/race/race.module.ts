import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from 'src/driver/entities/driver.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { RaceController } from './race.controller';
import { PassengerTypeOrmRepository } from 'src/passenger/repository/passenger.repository';
import { DriverTypeOrmRepository } from 'src/driver/repository/driver.repository';
import { CreateFareUseCase } from './use-cases/fare.use-case';
import { GenerateReceiptUseCase } from './use-cases/generate-receipt.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger, Driver])],
  controllers: [RaceController],
  providers: [
    CreateFareUseCase,
    DriverTypeOrmRepository,
    PassengerTypeOrmRepository,
    GenerateReceiptUseCase,
    {
      provide: 'IDriverRepository',
      useExisting: DriverTypeOrmRepository,
    },
    {
      provide: 'IPassengerRepository',
      useExisting: PassengerTypeOrmRepository,
    },
  ],
})
export class RaceModule {}
