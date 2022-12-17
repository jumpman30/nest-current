import { ReportsService } from './reports.service';
import { ReportDto } from './dtos/report.dto';
export declare class ReportsController {
    reportService: ReportsService;
    constructor(reportService: ReportsService);
    create(reportDto: ReportDto): Promise<void>;
}
