import { Status } from 'src/core/value-objects/appointment/status';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ClientEntity } from './ClientEntity';
import { BarberEntity } from './BarberEntity';
import { ServiceEntity } from './ServiceEntity';

@Entity('appointment')
export class AppointmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  clientId: string;

  @Column()
  barberId: string;

  @Column()
  serviceId: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  state: Status;

  @Column()
  barberShopId: string;

  @ManyToOne(() => ClientEntity, (client) => client.appointments)
  @JoinColumn({ name: 'clientId' })
  client: ClientEntity;

  @ManyToOne(() => BarberEntity, (barber) => barber.appointments)
  @JoinColumn({ name: 'barberId' })
  barber: BarberEntity;

  @ManyToOne(() => ServiceEntity, (service) => service.appointments)
  @JoinColumn({ name: 'serviceId' })
  service: ServiceEntity;
}
