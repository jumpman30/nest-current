import { Injectable } from '@nestjs/common';
import { Report } from '../entity/report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async create(car: string, mileage: number, price: number) {
    await this.reportRepository.save(new Report(car, mileage, price));
  }
}
