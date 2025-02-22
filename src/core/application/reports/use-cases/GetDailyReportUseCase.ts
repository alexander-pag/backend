import { ReportDto } from '../dtos/report.dto';
import { ReportService } from '../services/ReportService';

export class GetDailyReportUseCase {
  constructor(private readonly reportService: ReportService) {}

  async execute(): Promise<ReportDto> {
    return this.reportService.getDailyReport();
  }
}
