import { Roles } from 'src/core/value-objects/user-role/roles';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClientEntity } from './ClientEntity';
import { BarberEntity } from './BarberEntity';

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
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => ClientEntity, (client) => client.user, { cascade: true })
  clients: ClientEntity[];

  @OneToMany(() => BarberEntity, (barber) => barber.user, { cascade: true })
  barbers: BarberEntity[];
}
