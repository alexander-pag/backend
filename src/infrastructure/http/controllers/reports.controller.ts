import { Controller, Get, Inject } from '@nestjs/common';
import { ReportDto } from 'src/core/application/reports/dtos/report.dto';
import { GetDailyReportUseCase } from 'src/core/application/reports/use-cases/GetDailyReportUseCase';

@Controller('reports')
export class ReportsController {
  constructor(
    @Inject('GetDailyReportUseCase')
    private readonly getDailyReportUseCase: GetDailyReportUseCase,
  ) {}

  @Get('daily')
  async getDailyReport(): Promise<ReportDto> {
    return this.getDailyReportUseCase.execute();
  }
}
