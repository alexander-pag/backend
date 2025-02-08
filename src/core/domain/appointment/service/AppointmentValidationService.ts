import { IAppointmentRepository } from 'src/core/domain/appointment/repositories/IAppointmentRepository';
import { AppointmentId } from 'src/core/domain/appointment/value-objects/appointmentId';

export class AppointmentValidationService {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async exists(appointmentId: AppointmentId): Promise<boolean> {
    const appointment =
      await this.appointmentRepository.findById(appointmentId);
    return !!appointment;
  }
}
