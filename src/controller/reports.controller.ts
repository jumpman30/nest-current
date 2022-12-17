import { Body, Controller, Post } from '@nestjs/common';
import { ReportsService } from '../service/reports.service';
import { ReportDto } from '../dto/report.dto';

@Controller('reports')
export class ReportsController {
  constructor(public reportService: ReportsService) {}

  @Post()
  async create(@Body() reportDto: ReportDto) {
    try {
      await this.reportService.create(
        reportDto.car,
        reportDto.mileage,
        reportDto.price,
      );
    } catch (err) {
      console.error(err.message);
    }
  }
}
