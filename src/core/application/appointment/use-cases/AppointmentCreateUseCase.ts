import { IAppointmentRepository } from 'src/core/domain/appointment/repositories/IAppointmentRepository';
import { CreateAppointmentDto } from '../dtos/CreateAppointmentDto';
import { ClientId } from 'src/core/domain/client/value-objects/clientId';
import { BarberId } from 'src/core/domain/barber/value-objects/barberId';
import { ServiceId } from 'src/core/domain/service/value-objects/serviceId';
import { ClientValidationService } from 'src/core/domain/client/service/ClientValidationService';
import { BarberValidationService } from 'src/core/domain/barber/service/BarberValidationService';
import { ServiceValidationService } from '../../service/services/ServiceValidationService';
import { ClientNotFoundError } from '../../client/exceptions/ClientNotFoundError';
import { BarberNotFoundError } from '../../barber/exceptions/BarberNotFoundError';
import { ServiceNotFoundError } from '../../service/exceptions/ServiceNotFoundError';
import { Appointment } from 'src/core/domain/appointment/appointment.entity';

export class AppointmentCreateUseCase {
  constructor(
    private readonly appointmentRepository: IAppointmentRepository,
    private readonly clientService: ClientValidationService,
    private readonly barberService: BarberValidationService,
    private readonly serviceService: ServiceValidationService,
  ) {}

  async execute(createAppointmentDto: CreateAppointmentDto): Promise<void> {
    const clientExists = await this.clientService.exists(
      new ClientId(createAppointmentDto.clientId),
    );

    if (!clientExists) {
      throw new ClientNotFoundError('El cliente no existe.');
    }

    const barberExists = await this.barberService.exists(
      new BarberId(createAppointmentDto.barberId),
    );

    if (!barberExists) {
      throw new BarberNotFoundError('El barbero no existe.');
    }

    const serviceExists = await this.serviceService.exists(
      new ServiceId(createAppointmentDto.serviceId),
    );

    if (!serviceExists) {
      throw new ServiceNotFoundError('El servicio no existe.');
    }

    const appointment = Appointment.create(createAppointmentDto);

    await this.appointmentRepository.save(appointment);
  }
}
