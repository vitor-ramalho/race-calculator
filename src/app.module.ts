import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriverModule } from './driver/driver.module';
import { PassengerModule } from './passenger/passenger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RaceModule } from './race/race.module';

@Module({
  imports: [
    DriverModule,
    PassengerModule,
    RaceModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'race-calculator',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
