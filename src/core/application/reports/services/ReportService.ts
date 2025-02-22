import { IReportRepository } from 'src/core/domain/reports/repositories/IReportRepository';
import { ReportDto } from '../dtos/report.dto';

export class ReportService {
  constructor(private readonly reportRepository: IReportRepository) {}

  async getDailyReport(): Promise<ReportDto> {
    const totalAppointments =
      await this.reportRepository.getDailyAppointments();
    const totalRevenue = await this.reportRepository.getDailyRevenue();
    const newClients = await this.reportRepository.getDailyNewClients();
    const appointmentsByBarber =
      await this.reportRepository.getDailyAppointmentsByBarber();
    const revenueByBarber =
      await this.reportRepository.getDailyRevenueByBarber();

    return new ReportDto(
      totalAppointments,
      totalRevenue,
      newClients,
      appointmentsByBarber,
      revenueByBarber,
    );
  }

  async getWeeklyReport(): Promise<ReportDto> {
    const totalAppointments =
      await this.reportRepository.getWeeklyAppointments();
    const totalRevenue = await this.reportRepository.getWeeklyRevenue();
    const newClients = await this.reportRepository.getWeeklyNewClients();
    const appointmentsByBarber =
      await this.reportRepository.getWeeklyAppointmentsByBarber();
    const revenueByBarber =
      await this.reportRepository.getWeeklyRevenueByBarber();

    return new ReportDto(
      totalAppointments,
      totalRevenue,
      newClients,
      appointmentsByBarber,
      revenueByBarber,
    );
  }
}
