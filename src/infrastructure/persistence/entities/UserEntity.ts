import { Roles } from 'src/core/value-objects/user-role/roles';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BarberEntity } from './BarberEntity';
import { ClientEntity } from './ClientEntity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  barberShopId: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.CLIENT,
  })
  role: Roles;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => ClientEntity, (client) => client.user, { cascade: true })
  clients: ClientEntity[];

  @OneToMany(() => BarberEntity, (barber) => barber.user, { cascade: true })
  barbers: BarberEntity[];
}
