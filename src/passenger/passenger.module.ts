import { Module } from '@nestjs/common';
import { PassengerController } from './passenger.controller';
import { PassengerTypeOrmRepository } from './repository/passenger.repository';
import { CreatePassengerUseCase } from './use-cases/create-passenger.use-case';
import { FindPassengerUseCase } from './use-cases/find-passenger.use-case';
import { FindPassengersUseCase } from './use-cases/find-passengers.use-case';
import { UpdatePassengerUseCase } from './use-cases/update-passenger.use-case';
import { DeletePassengerUseCase } from './use-cases/delete-passenger.use-case';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from './entities/passenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger])],
  controllers: [PassengerController],
  providers: [
    CreatePassengerUseCase,
    FindPassengerUseCase,
    FindPassengersUseCase,
    UpdatePassengerUseCase,
    DeletePassengerUseCase,
    PassengerTypeOrmRepository,
    {
      provide: 'IPassengerRepository',
      useExisting: PassengerTypeOrmRepository,
    },
  ],
})
export class PassengerModule {}
