export enum SubscriptionPlan {
  MONTHLY = 'monthly',
  BIMONTHLY = 'bimonthly',
  QUARTERLY = 'quarterly',
  BIANNUAL = 'biannual',
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  CANCELED = 'canceled',
}

export class CreateSubscriptionDto {
  constructor(
    public readonly barbershopId: string,
    public readonly plan: SubscriptionPlan,
    public readonly startDate: string,
    public readonly endDate: string,
    public readonly status?: SubscriptionStatus,
    public readonly id?: string,
  ) {}
}

export class UpdateSubscriptionDto {
  constructor(
    public readonly barbershopId?: string,
    public readonly plan?: SubscriptionPlan,
    public readonly startDate?: string,
    public readonly endDate?: string,
    public readonly status?: SubscriptionStatus,
  ) {}
}

export class Subscription {
  constructor(
    private readonly _barbershopId: string,
    private _plan: SubscriptionPlan,
    private readonly _startDate: Date,
    private readonly _endDate: Date,
    private _status?: SubscriptionStatus,
    private readonly _id?: string,
  ) {}

  get id(): string | undefined {
    return this._id;
  }

  get barbershopId(): string {
    return this._barbershopId;
  }

  get plan(): SubscriptionPlan {
    return this._plan;
  }

  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }

  get status(): SubscriptionStatus {
    return this._status;
  }

  update(
    fields: Partial<{
      plan: SubscriptionPlan;
      status: SubscriptionStatus;
    }>,
  ): Subscription {
    return new Subscription(
      this._barbershopId,
      fields.plan || this._plan,
      this._startDate,
      this._endDate,
      fields.status || this._status,
      this._id,
    );
  }

  static create(createSubscriptionDto: CreateSubscriptionDto): Subscription {
    return new Subscription(
      createSubscriptionDto.barbershopId,
      createSubscriptionDto.plan,
      new Date(createSubscriptionDto.startDate),
      new Date(createSubscriptionDto.endDate),
      createSubscriptionDto.status,
      createSubscriptionDto.id,
    );
  }
}
