import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AppointmentEntity } from './AppointmentEntity';

@Entity('service')
export class ServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  barberShopId: string;

  @Column()
  duration: number;

  @Column({
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.service)
  appointments: AppointmentEntity[];
}
