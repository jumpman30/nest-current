import { ReportsService } from '../service/reports.service';
import { ReportDto } from '../dto/report.dto';
export declare class ReportsController {
    reportService: ReportsService;
    constructor(reportService: ReportsService);
    create(reportDto: ReportDto): Promise<void>;
}
