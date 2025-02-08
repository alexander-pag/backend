import { Appointment } from 'src/core/domain/appointment/appointment.entity';
import { IAppointmentRepository } from 'src/core/domain/appointment/repositories/IAppointmentRepository';

export class AppointmentGetAllUseCase {
  constructor(private readonly appointmentRepository: IAppointmentRepository) {}

  async execute(): Promise<Appointment[]> {
    return await this.appointmentRepository.findAll();
  }
}
