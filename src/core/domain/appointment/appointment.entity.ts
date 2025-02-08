import { AppointmentDate } from './value-objects/appointmentDate';
import { AppointmentId } from './value-objects/appointmentId';
import { AppointmentError } from './exceptions/AppointmentError';
import { ClientId } from '../client/value-objects/clientId';
import { BarberId } from '../barber/value-objects/barberId';
import { ServiceId } from '../service/value-objects/serviceId';
import { AppointmentState } from './value-objects/appointmentState';
import { CreateAppointmentDto } from 'src/core/application/appointment/dtos/CreateAppointmentDto';
import { BarberShopId } from '../barberShop/value-objects/barberShopId';

export class Appointment {
  constructor(
    private _date: AppointmentDate,
    private readonly _clientId: ClientId,
    private readonly _barberId: BarberId,
    private _serviceId: ServiceId,
    private readonly _barbershopId: BarberShopId,
    private _state?: AppointmentState,
    private readonly _id?: AppointmentId,
  ) {
    this.validate();
  }

  get id(): AppointmentId | undefined {
    return this._id;
  }

  get barbershopId(): BarberShopId {
    return this._barbershopId;
  }

  get date(): AppointmentDate {
    return this._date;
  }

  get status(): AppointmentState {
    return this._state;
  }

  get clientId(): ClientId {
    return this._clientId;
  }

  get barberId(): BarberId {
    return this._barberId;
  }

  get serviceId(): ServiceId {
    return this._serviceId;
  }

  update(
    fields: Partial<{
      date: AppointmentDate;
      state: AppointmentState;
      serviceId: ServiceId;
    }>,
  ): Appointment {
    return new Appointment(
      fields.date || this._date,
      this._clientId,
      this._barberId,
      fields.serviceId || this._serviceId,
      this._barbershopId,
      fields.state || this._state,
      this._id,
    );
  }

  static create(createAppointmentDto: CreateAppointmentDto): Appointment {
    return new Appointment(
      new AppointmentDate(new Date(createAppointmentDto.date)),
      new ClientId(createAppointmentDto.clientId),
      new BarberId(createAppointmentDto.barberId),
      new ServiceId(createAppointmentDto.serviceId),
      new BarberShopId(createAppointmentDto.barbershopId),
    );
  }

  private validate(): void {
    if (!this._clientId || !this._barberId || !this._serviceId || !this._date) {
      throw new AppointmentError('Todos los campos de la cita son requeridos.');
    }
  }
}
