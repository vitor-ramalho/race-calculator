import { FareStrategy } from './fare.strategy.interface';

export class WeekendFare implements FareStrategy {
  matches(date: Date): boolean {
    const day = date.getDay();
    console.log(day);
    return day === 0 || day === 6;
  }

  getRate(date: Date): number {
    const hour = date.getHours();
    console.log(hour);
    if (hour >= 8 && hour < 17) return 3.0;
    if (hour >= 17 && hour < 20) return 4.1;
    return 3.5;
  }
}
