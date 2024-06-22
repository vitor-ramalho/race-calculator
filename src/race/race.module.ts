import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from 'src/driver/entities/driver.entity';
import { Passenger } from 'src/passenger/entities/passenger.entity';
import { RaceController } from './race.controller';
import { PassengerTypeOrmRepository } from 'src/passenger/repository/passenger.repository';
import { DriverTypeOrmRepository } from 'src/driver/repository/driver.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger, Driver])],
  controllers: [RaceController],
  providers: [
    DriverTypeOrmRepository,
    PassengerTypeOrmRepository,
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
export class PassengerModule {}
