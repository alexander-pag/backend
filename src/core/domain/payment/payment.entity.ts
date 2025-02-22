import { CreatePaymentDto } from 'src/core/application/payment/dtos/CreatePaymentDto';
import { BarberShopId } from '../barberShop/value-objects/barberShopId';
import { PaymentId } from './value-objects/paymentId';
import { PaymentAmount } from './value-objects/paymentAmount';
import { PaymentMethod } from './value-objects/paymentMethod';
import { PaymentStatus } from './value-objects/paymentStatus';
import { SubscriptionId } from '../subscription/value-objects/subscriptionId';

export class Payment {
  constructor(
    private readonly _barbershopId: BarberShopId,
    private readonly _subscriptionId: SubscriptionId,
    private readonly _amount: PaymentAmount,
    private _status: PaymentStatus,
    private readonly _paymentMethod: PaymentMethod,
    private readonly _id?: PaymentId,
  ) {}

  get id(): PaymentId | undefined {
    return this._id;
  }

  get barbershopId(): BarberShopId {
    return this._barbershopId;
  }

  get amount(): PaymentAmount {
    return this._amount;
  }

  get status(): PaymentStatus {
    return this._status;
  }

  get subscriptionId(): SubscriptionId {
    return this._subscriptionId;
  }

  get paymentMethod(): PaymentMethod {
    return this._paymentMethod;
  }

  update(
    fields: Partial<{
      status: PaymentStatus;
    }>,
  ): Payment {
    return new Payment(
      this._barbershopId,
      this._subscriptionId,
      this._amount,
      fields.status || this._status,
      this._paymentMethod,
      this._id,
    );
  }

  static create(createPaymentDto: CreatePaymentDto): Payment {
    return new Payment(
      new BarberShopId(createPaymentDto.barbershopId),
      new SubscriptionId(createPaymentDto.subscriptionId),
      new PaymentAmount(createPaymentDto.amount),
      new PaymentStatus(createPaymentDto.status),
      new PaymentMethod(createPaymentDto.paymentMethod),
    );
  }
}
