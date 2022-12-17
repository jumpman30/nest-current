import { BaseModel } from '../interface/types';
export declare class User implements BaseModel {
    id: number;
    username: string;
    password: string;
    constructor(username: string, password: string);
    validateRemoval(): Promise<void>;
}
