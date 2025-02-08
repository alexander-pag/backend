import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/core/domain/appointment/appointment.entity';
import { IAppointmentRepository } from 'src/core/domain/appointment/repositories/IAppointmentRepository';
import { AppointmentId } from 'src/core/domain/appointment/value-objects/appointmentId';
import { BarberId } from 'src/core/domain/barber/value-objects/barberId';
import { ClientId } from 'src/core/domain/client/value-objects/clientId';
import { Repository } from 'typeorm';
import { AppointmentMapper } from '../mappers/AppointmentMapper';
import { AppointmentEntity } from '../entities/AppointmentEntity';
import { AppointmentDate } from 'src/core/domain/appointment/value-objects/appointmentDate';
import { ServiceId } from 'src/core/domain/service/value-objects/serviceId';
import { AppointmentState } from 'src/core/domain/appointment/value-objects/appointmentState';

@Injectable()
export class AppointmentRepository implements IAppointmentRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
  ) {}

  async findById(id: AppointmentId): Promise<Appointment | null> {
    const appointmentEntity = await this.appointmentRepository.findOne({
      where: { id: id.value },
    });

    if (!appointmentEntity) {
      return null;
    }

    return AppointmentMapper.toDomain(appointmentEntity);
  }

  async findAll(): Promise<Appointment[]> {
    const appointmentEntities = await this.appointmentRepository.find();

    return appointmentEntities.map((appointmentEntity) =>
      AppointmentMapper.toDomain(appointmentEntity),
    );
  }

  async save(appointment: Appointment): Promise<void> {
    const appointmentEntity = AppointmentMapper.toEntity(appointment);
    await this.appointmentRepository.save(appointmentEntity);
  }

  async delete(id: AppointmentId): Promise<void> {
    await this.appointmentRepository.delete({
      id: id.value,
    });
  }

  async findByBarberId(barberId: BarberId): Promise<Appointment[]> {
    const appointmentEntities = await this.appointmentRepository.find({
      where: { barberId: barberId.value },
    });

    return appointmentEntities.map((appointmentEntity) =>
      AppointmentMapper.toDomain(appointmentEntity),
    );
  }

  async findByClientId(clientId: ClientId): Promise<Appointment[]> {
    const appointmentEntities = await this.appointmentRepository.find({
      where: { clientId: clientId.value },
    });

    return appointmentEntities.map((appointmentEntity) =>
      AppointmentMapper.toDomain(appointmentEntity),
    );
  }

  async findByDate(date: AppointmentDate): Promise<Appointment[]> {
    const appointmentEntities = await this.appointmentRepository.find({
      where: { date: date.value },
    });

    return appointmentEntities.map((appointmentEntity) =>
      AppointmentMapper.toDomain(appointmentEntity),
    );
  }

  async findByServiceId(serviceId: ServiceId): Promise<Appointment[]> {
    const appointmentEntities = await this.appointmentRepository.find({
      where: { serviceId: serviceId.value },
    });

    return appointmentEntities.map((appointmentEntity) =>
      AppointmentMapper.toDomain(appointmentEntity),
    );
  }

  async findByState(state: AppointmentState): Promise<Appointment[]> {
    const appointmentEntities = await this.appointmentRepository.find({
      where: { state: state.value },
    });

    return appointmentEntities.map((appointmentEntity) =>
      AppointmentMapper.toDomain(appointmentEntity),
    );
  }
}
