import { Payment } from '../payment.entity';
import { PaymentId } from '../value-objects/paymentId';

export interface IPaymentRepository {
  findById(paymentId: PaymentId): Promise<Payment | null>;
  findAll(): Promise<Payment[]>;
  save(subscription: Payment): Promise<Payment>;
  delete(subscrippaymentIdtionId: PaymentId): Promise<void>;
}
