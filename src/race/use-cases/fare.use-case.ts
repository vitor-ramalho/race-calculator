import { Inject, Injectable } from '@nestjs/common';
import { IDriverRepository } from 'src/driver/repository/driver-repository.interface';
import { IPassengerRepository } from 'src/passenger/repository/passenger-repository.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateFareDto } from '../dto/create-fare.dto';

interface FareStrategy {
  matches(date: Date): boolean;
  getRate(): number;
}

class WeekdayMorningFare implements FareStrategy {
  matches(date: Date): boolean {
    const day = date.getDay();
    const hour = date.getHours();
    return day >= 1 && day <= 5 && hour >= 8 && hour < 17;
  }

  getRate(): number {
    return 2.8;
  }
}

@Injectable()
export class CreateFareUseCase {
  private fareStrategies: FareStrategy[];

  constructor() {
    this.fareStrategies = [new WeekdayMorningFare()];
  }

  execute(createFareDto: CreateFareDto) {
    const { date, currentLat, currentLng, destinationLat, destinationLng } =
      createFareDto;

    const distance = this.calculateDistance(
      currentLat,
      currentLng,
      destinationLat,
      destinationLng,
    );

    const requestDate = new Date(date);
    const fareRate = this.getFareRate(requestDate);

    const fare = (distance / 1000) * fareRate;

    return {
      price: fare.toFixed(2),
      requestId: uuidv4(),
    };
  }

  private getFareRate(date: Date): number {
    for (const strategy of this.fareStrategies) {
      if (strategy.matches(date)) {
        return strategy.getRate();
      }
    }

    throw new Error('No fare rate found for the given date');
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const earthRadius = 6371e3;
    const lat1InRadians = (lat1 * Math.PI) / 180;
    const lat2InRadians = (lat2 * Math.PI) / 180;
    const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1InRadians) *
        Math.cos(lat2InRadians) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  }
}
