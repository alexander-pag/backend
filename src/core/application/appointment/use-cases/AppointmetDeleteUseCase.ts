import { IAppointmentRepository } from 'src/core/domain/appointment/repositories/IAppointmentRepository';
import { AppointmentId } from 'src/core/domain/appointment/value-objects/appointmentId';
import { AppointmentNotFoundError } from '../exceptions/AppointmentNotFoundError';

export class AppointmentDeleteUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute(id: string): Promise<void> {
    const existingAppointment = await this.appointmentRepository.findById(
      new AppointmentId(id),
    );

    if (!existingAppointment) {
      throw new AppointmentNotFoundError('La cita no existe.');
    }

    await this.appointmentRepository.delete(new AppointmentId(id));
  }
}
