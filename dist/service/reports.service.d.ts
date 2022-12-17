import { Report } from '../entity/report.entity';
import { Repository } from 'typeorm';
export declare class ReportsService {
    private reportRepository;
    constructor(reportRepository: Repository<Report>);
    create(car: string, mileage: number, price: number): Promise<void>;
}
