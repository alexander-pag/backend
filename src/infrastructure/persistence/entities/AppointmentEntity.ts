import { Status } from 'src/core/value-objects/appointment/status';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
