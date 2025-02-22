import { Module } from '@nestjs/common';
import { ReportsController } from '../http/controllers/reports.controller';
import { TypeOrmReportRepository } from '../persistence/repositories/ReportRepository';
import { GetDailyReportUseCase } from 'src/core/application/reports/use-cases/GetDailyReportUseCase';
import { ReportService } from 'src/core/application/reports/services/ReportService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from '../persistence/entities/AppointmentEntity';
import { ClientEntity } from '../persistence/entities/ClientEntity';
import { BarberEntity } from '../persistence/entities/BarberEntity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentEntity, ClientEntity, BarberEntity]),
  ],
  providers: [
    {
      provide: 'IReportRepository',
      useClass: TypeOrmReportRepository,
    },
    {
      provide: 'ReportService',
      useFactory: (reportRepository: TypeOrmReportRepository) =>
        new ReportService(reportRepository),
      inject: ['IReportRepository'],
    },
    {
      provide: 'GetDailyReportUseCase',
      useFactory: (reportService: ReportService) =>
        new GetDailyReportUseCase(reportService),
      inject: ['ReportService'],
    },
  ],
  controllers: [ReportsController],
})
export class ReportsModule {}
