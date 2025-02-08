import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './UserEntity';

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

  @ManyToOne(() => UserEntity, (user) => user.clients)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
