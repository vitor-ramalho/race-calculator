export interface FareStrategy {
  matches(date: Date): boolean;
  getRate(date: Date): number;
}
