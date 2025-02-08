import { IAppointmentRepository } from 'src/core/domain/appointment/repositories/IAppointmentRepository';
import { AppointmentValidationService } from 'src/core/domain/appointment/service/AppointmentValidationService';
import { AppointmentNotFoundError } from '../exceptions/AppointmentNotFoundError';
import { AppointmentId } from 'src/core/domain/appointment/value-objects/appointmentId';

export class AppointmentDeleteUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly appointmentService: AppointmentValidationService,
  ) {}

  async execute(id: string): Promise<void> {
    const appointmentExists = await this.appointmentService.exists(
      new AppointmentId(id),
    );

    if (!appointmentExists) {
      throw new AppointmentNotFoundError('La cita no existe.');
    }

    await this.appointmentRepository.delete(new AppointmentId(id));
  }
}
