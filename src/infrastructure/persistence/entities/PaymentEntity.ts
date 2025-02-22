import { Amount } from 'src/core/value-objects/payment/amount';
import { Method } from 'src/core/value-objects/payment/method';
import { Status } from 'src/core/value-objects/payment/status';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  barbershopId: string;

  @Column()
  subscriptionId: string;

  @Column({
    type: 'enum',
    enum: Amount,
  })
  amount: Amount;

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: Method,
  })
  paymentMethod: Method;
}
