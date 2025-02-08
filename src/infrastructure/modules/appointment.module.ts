import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentCreateUseCase } from 'src/core/application/appointment/use-cases/AppointmentCreateUseCase';
import { AppointmentUpdateUseCase } from 'src/core/application/appointment/use-cases/AppointmentUpdateUseCase';
import { AppointmentDeleteUseCase } from 'src/core/application/appointment/use-cases/AppointmetDeleteUseCase';
import { AppointmentGetAllUseCase } from 'src/core/application/appointment/use-cases/AppointmetGetAllUseCase';
import { AppointmentGetByIdUseCase } from 'src/core/application/appointment/use-cases/AppointmetGetByIdUseCase';
import { AppointmentController } from 'src/infrastructure/http/controllers/appointment.controller';
import { AppointmentEntity } from 'src/infrastructure/persistence/entities/AppointmentEntity';
import { AppointmentRepository } from 'src/infrastructure/persistence/repositories/AppointmentRepository';
import { AppointmentValidationService } from 'src/core/domain/appointment/service/AppointmentValidationService';
import { ClientValidationService } from 'src/core/domain/client/service/ClientValidationService';
import { BarberValidationService } from 'src/core/domain/barber/service/BarberValidationService';
import { ServiceValidationService } from 'src/core/application/service/services/ServiceValidationService';
import { SharedModule } from './shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity]), SharedModule],
  providers: [
    {
      provide: 'IAppointmentRepository',
      useClass: AppointmentRepository,
    },
    {
      provide: 'AppointmentService',
      useFactory: (appointmentRepository: AppointmentRepository) =>
        new AppointmentValidationService(appointmentRepository),
      inject: ['IAppointmentRepository'],
    },
    {
      provide: 'AppointmentUseCases',
      useFactory: (
        appointmentRepository: AppointmentRepository,
        clientService: ClientValidationService,
        barberService: BarberValidationService,
        serviceService: ServiceValidationService,
      ) => ({
        create: new AppointmentCreateUseCase(
          appointmentRepository,
          clientService,
          barberService,
          serviceService,
        ),
        update: new AppointmentUpdateUseCase(
          appointmentRepository,
          clientService,
          barberService,
          serviceService,
        ),
        getAll: new AppointmentGetAllUseCase(appointmentRepository),
        getById: new AppointmentGetByIdUseCase(appointmentRepository),
        delete: new AppointmentDeleteUseCase(appointmentRepository),
      }),
      inject: ['IAppointmentRepository', 'ClientService', 'BarberService'],
    },
  ],
  controllers: [AppointmentController],
  exports: ['AppointmentService'],
})
export class AppointmentModule {}
