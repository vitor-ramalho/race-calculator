import {
  IsDateString,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateFareDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsLatitude()
  currentLat: number;

  @IsNotEmpty()
  @IsLongitude()
  currentLng: number;

  @IsNotEmpty()
  @IsLatitude()
  destinationLat: number;

  @IsNotEmpty()
  @IsLongitude()
  destinationLng: number;
}
