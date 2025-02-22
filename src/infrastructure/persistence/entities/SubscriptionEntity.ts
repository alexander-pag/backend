import { DurationMonth } from 'src/core/value-objects/subscription/durationMonth';
import { Price } from 'src/core/value-objects/subscription/price';
import { Status } from 'src/core/value-objects/subscription/status';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  barberShopId: string;

  @Column({
    type: 'enum',
    enum: DurationMonth,
    default: DurationMonth.MONTHLY,
  })
  durationMonth: DurationMonth;

  @Column({
    type: 'enum',
    enum: Price,
    default: Price.MONTHLY,
  })
  price: Price;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;
}
