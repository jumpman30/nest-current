import { IsNumber, IsString } from 'class-validator';

export class ReportDto {
  @IsString()
  car: string;

  @IsNumber()
  mileage: number;

  @IsNumber()
  price: number;
}
