import { IAppointmentRepository } from 'src/core/domain/appointment/repositories/IAppointmentRepository';
import { UpdateAppointmentDto } from '../dtos/UpdateAppointmentDto';
import { AppointmentNotFoundError } from '../exceptions/AppointmentNotFoundError';
import { AppointmentId } from 'src/core/domain/appointment/value-objects/appointmentId';
import { AppointmentDate } from 'src/core/domain/appointment/value-objects/appointmentDate';
import { ClientId } from 'src/core/domain/client/value-objects/clientId';
import { BarberId } from 'src/core/domain/barber/value-objects/barberId';
import { ServiceId } from 'src/core/domain/service/value-objects/serviceId';
import { AppointmentState } from 'src/core/domain/appointment/value-objects/appointmentState';
import { ClientValidationService } from 'src/core/domain/client/service/ClientValidationService';
import { BarberValidationService } from 'src/core/domain/barber/service/BarberValidationService';
import { ServiceValidationService } from '../../service/services/ServiceValidationService';
import { ClientNotFoundError } from '../../client/exceptions/ClientNotFoundError';
import { BarberNotFoundError } from '../../barber/exceptions/BarberNotFoundError';
import { ServiceNotFoundError } from '../../service/exceptions/ServiceNotFoundError';

export class AppointmentUpdateUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly clientService: ClientValidationService,
    private readonly barberService: BarberValidationService,
    private readonly serviceService: ServiceValidationService,
  ) {}

  async execute(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<void> {
    const { barberId, clientId, serviceId } = updateAppointmentDto;

    const existingAppointment = await this.appointmentRepository.findById(
      new AppointmentId(id),
    );
    if (!existingAppointment) {
      throw new AppointmentNotFoundError('La cita no existe.');
    }

    if (clientId) {
      const clientExists = await this.clientService.exists(
        new ClientId(updateAppointmentDto.clientId),
      );

      if (!clientExists) {
        throw new ClientNotFoundError('El cliente no existe.');
      }
    }

    if (barberId) {
      const barberExists = await this.barberService.exists(
        new BarberId(updateAppointmentDto.barberId),
      );

      if (!barberExists) {
        throw new BarberNotFoundError('El barbero no existe.');
      }
    }

    if (serviceId) {
      const serviceExists = await this.serviceService.exists(
        new ServiceId(updateAppointmentDto.serviceId),
      );

      if (!serviceExists) {
        throw new ServiceNotFoundError('El servicio no existe.');
      }
    }

    const appointment = await this.appointmentRepository.findById(
      new AppointmentId(id),
    );

    const updatedAppointment = appointment.update({
      date: updateAppointmentDto.date
        ? new AppointmentDate(new Date(updateAppointmentDto.date))
        : undefined,
      state: updateAppointmentDto.state
        ? new AppointmentState(updateAppointmentDto.state)
        : undefined,

      serviceId: updateAppointmentDto.serviceId
        ? new ServiceId(updateAppointmentDto.serviceId)
        : undefined,
    });

    await this.appointmentRepository.save(updatedAppointment);
  }
}
