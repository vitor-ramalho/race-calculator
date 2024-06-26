import { FareStrategy } from './fare.strategy.interface';

export class WeekdayFare implements FareStrategy {
  matches(date: Date): boolean {
    const day = date.getDay();
    console.log(day);
    return day >= 1 && day <= 5; // Monday to Friday
  }

  getRate(date: Date): number {
    const hour = date.getHours();
    console.log(hour);
    if (hour >= 8 && hour < 17) return 2.8;
    if (hour >= 17 && hour < 20) return 3.5;
    return 3.1; // Default for hours outside 08:00-20:00
  }
}
