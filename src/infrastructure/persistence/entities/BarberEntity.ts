import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './UserEntity';
import { AppointmentEntity } from './AppointmentEntity';

@Entity('barber')
export class BarberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  specialty: string;

  @Column()
  userId: string;

  @Column()
  barberShopId: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.barbers)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.barber)
  appointments: AppointmentEntity[];
}
