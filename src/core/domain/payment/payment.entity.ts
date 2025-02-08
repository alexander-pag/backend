import { BarberShopId } from '../barberShop/value-objects/barberShopId';

export enum PaymentStatus {
  COMPLETED = 'completed',
  PENDING = 'pending',
  FAILED = 'failed',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  STRIPE = 'stripe',
  PSE = 'pse',
}

export class CreatePaymentDto {
  constructor(
    public readonly barbershopId: string,
    public readonly amount: number,
    public readonly status: PaymentStatus,
    public readonly paymentMethod: PaymentMethod,
    public readonly id?: string,
  ) {}
}

export class Payment {
  constructor(
    private readonly _barbershopId: BarberShopId,
    private readonly _amount: number,
    private _status: PaymentStatus,
    private readonly _paymentMethod: PaymentMethod,
    private readonly _id?: string,
  ) {}

  get id(): string | undefined {
    return this._id;
  }

  get barbershopId(): BarberShopId {
    return this._barbershopId;
  }

  get amount(): number {
    return this._amount;
  }

  get status(): PaymentStatus {
    return this._status;
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
      this._amount,
      fields.status || this._status,
      this._paymentMethod,
      this._id,
    );
  }

  static create(createPaymentDto: CreatePaymentDto): Payment {
    return new Payment(
      new BarberShopId(createPaymentDto.barbershopId),
      createPaymentDto.amount,
      createPaymentDto.status,
      createPaymentDto.paymentMethod,
      createPaymentDto.id,
    );
  }
}
