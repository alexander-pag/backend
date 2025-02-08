import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './UserEntity';

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

  @ManyToOne(() => UserEntity, (user) => user.barbers)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
