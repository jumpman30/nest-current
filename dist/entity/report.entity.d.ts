import { BaseModel } from '../interface/types';
export declare class Report implements BaseModel {
    id: number;
    car: string;
    mileage: number;
    price: number;
    constructor(car: string, mileage: number, price: number);
}
