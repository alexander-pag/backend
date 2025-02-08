import { Appointment } from 'src/core/domain/appointment/appointment.entity';
import { ClientId } from 'src/core/domain/client/value-objects/clientId';
import { BarberId } from 'src/core/domain/barber/value-objects/barberId';
import { ServiceId } from 'src/core/domain/service/value-objects/serviceId';
import { AppointmentDate } from 'src/core/domain/appointment/value-objects/appointmentDate';
import { AppointmentEntity } from '../entities/AppointmentEntity';
import { AppointmentState } from 'src/core/domain/appointment/value-objects/appointmentState';
import { AppointmentId } from 'src/core/domain/appointment/value-objects/appointmentId';

export class AppointmentMapper {
  static toEntity(appointment: Appointment): AppointmentEntity {
    const appointmentEntity = new AppointmentEntity();

    appointmentEntity.id = appointment.id?.value;
    appointmentEntity.clientId = appointment.clientId.value;
    appointmentEntity.barberId = appointment.barberId.value;
    appointmentEntity.serviceId = appointment.serviceId.value;
    appointmentEntity.date = appointment.date.value;
    appointmentEntity.state = appointment.status?.value;

    return appointmentEntity;
  }

  static toDomain(appointmentEntity: AppointmentEntity): Appointment {
    return new Appointment(
      new AppointmentDate(appointmentEntity.date),
      new ClientId(appointmentEntity.clientId),
      new BarberId(appointmentEntity.barberId),
      new ServiceId(appointmentEntity.serviceId),
      new AppointmentState(appointmentEntity.state),
      new AppointmentId(appointmentEntity.id),
    );
  }
}
