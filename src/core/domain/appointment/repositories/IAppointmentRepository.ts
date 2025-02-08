import { Status } from 'src/core/value-objects/appointment/status';
import { BarberId } from '../../barber/value-objects/barberId';
import { ClientId } from '../../client/value-objects/clientId';
import { ServiceId } from '../../service/value-objects/serviceId';
import { Appointment } from '../appointment.entity';
import { AppointmentId } from '../value-objects/appointmentId';
import { AppointmentDate } from '../value-objects/appointmentDate';
import { AppointmentState } from '../value-objects/appointmentState';

export interface IAppointmentRepository {
  findById(appointmentId: AppointmentId): Promise<Appointment | null>;
  findByClientId(clientId: ClientId): Promise<Appointment[]>;
  findByBarberId(barberId: BarberId): Promise<Appointment[]>;
  findByDate(date: AppointmentDate): Promise<Appointment[]>;
  findByServiceId(serviceId: ServiceId): Promise<Appointment[]>;
  findByState(state: AppointmentState): Promise<Appointment[]>;
  findAll(): Promise<Appointment[]>;
  save(appointment: Appointment): Promise<void>;
  delete(appointmentId: AppointmentId): Promise<void>;
}
