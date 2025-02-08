import { Appointment } from 'src/core/domain/appointment/appointment.entity';
import { IAppointmentRepository } from 'src/core/domain/appointment/repositories/IAppointmentRepository';
import { AppointmentId } from 'src/core/domain/appointment/value-objects/appointmentId';
import { AppointmentNotFoundError } from '../exceptions/AppointmentNotFoundError';

export class AppointmentGetByIdUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute(id: string): Promise<Appointment> {
    const existingAppointment = await this.appointmentRepository.findById(
      new AppointmentId(id),
    );

    if (!existingAppointment) {
      throw new AppointmentNotFoundError('La cita no existe.');
    }

    return existingAppointment;
  }
}
