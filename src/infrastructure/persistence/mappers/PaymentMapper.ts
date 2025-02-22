import { Payment } from 'src/core/domain/payment/payment.entity';
import { PaymentEntity } from '../entities/PaymentEntity';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { PaymentAmount } from 'src/core/domain/payment/value-objects/paymentAmount';
import { PaymentStatus } from 'src/core/domain/payment/value-objects/paymentStatus';
import { PaymentMethod } from 'src/core/domain/payment/value-objects/paymentMethod';
import { PaymentId } from 'src/core/domain/payment/value-objects/paymentId';
import { SubscriptionId } from 'src/core/domain/subscription/value-objects/subscriptionId';

export class PaymentMapper {
  static toEntity(payment: Payment): PaymentEntity {
    const paymentEntity = new PaymentEntity();
    paymentEntity.id = payment.id?.value;
    paymentEntity.barbershopId = payment.barbershopId.value;
    paymentEntity.amount = payment.amount.value;
    paymentEntity.status = payment.status.value;
    paymentEntity.paymentMethod = payment.paymentMethod.value;
    return paymentEntity;
  }
  static toDomain(paymentEntity: PaymentEntity): Payment {
    return new Payment(
      new BarberShopId(paymentEntity.barbershopId),
      new SubscriptionId(paymentEntity.subscriptionId),
      new PaymentAmount(paymentEntity.amount),
      new PaymentStatus(paymentEntity.status),
      new PaymentMethod(paymentEntity.paymentMethod),
      new PaymentId(paymentEntity.id),
    );
  }
}
