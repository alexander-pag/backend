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

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @ManyToOne(() => UserEntity, (user) => user.clients)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => AppointmentEntity, (appointment) => appointment.client)
  appointments: AppointmentEntity[];
}
