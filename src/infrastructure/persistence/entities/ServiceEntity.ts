import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column()
  isActive: boolean;
}
