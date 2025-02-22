import { SubscriptionStatus } from 'src/core/value-objects/barberShop/subscriptionStatus';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('barberShop')
export class BarberShopEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  neighborhood: string;

  @Column()
  address: string;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.PENDING,
  })
  subscriptionStatus: SubscriptionStatus;

  @Column({ nullable: true })
  subscriptionId: string;
}
