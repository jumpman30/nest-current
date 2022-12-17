import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../interface/types';

@Entity()
export class Report implements BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  car: string;

  @Column()
  mileage: number;

  @Column()
  price: number;

  constructor(car: string, mileage: number, price: number) {
    this.price = price;
    this.mileage = mileage;
    this.car = car;
  }
}
