import { BarberShopId } from '../barberShop/value-objects/barberShopId';
import { CreateSubscriptionDto } from 'src/core/application/subscription/dtos/CreateSubscriptionDto';
import { SubscriptionDurationMonth } from './value-objects/subscriptionPlan';
import { SubscriptionStartDate } from './value-objects/subscriptionStartDate';
import { SubscriptionEndDate } from './value-objects/subscriptionEndDate';
import { SubscriptionId } from './value-objects/subscriptionId';
import { SubscriptionStatus } from './value-objects/subscriptionStatus';
import { Status } from 'src/core/value-objects/subscription/status';
import { DurationMonth } from 'src/core/value-objects/subscription/durationMonth';
import { SubscriptionPrice } from './value-objects/subscriptionPrice';
import { Price } from 'src/core/value-objects/subscription/price';

export class Subscription {
  constructor(
    private readonly _barbershopId: BarberShopId,
    private _durationMonth: SubscriptionDurationMonth,
    private _price: SubscriptionPrice,
    private readonly _startDate: SubscriptionStartDate,
    private readonly _endDate: SubscriptionEndDate,
    private _status: SubscriptionStatus,
    private readonly _id?: SubscriptionId,
  ) {}

  get id(): SubscriptionId | undefined {
    return this._id;
  }

  get barbershopId(): BarberShopId {
    return this._barbershopId;
  }

  get durationMonth(): SubscriptionDurationMonth {
    return this._durationMonth;
  }

  get price(): SubscriptionPrice {
    return this._price;
  }

  get startDate(): SubscriptionStartDate {
    return this._startDate;
  }

  get endDate(): SubscriptionEndDate {
    return this._endDate;
  }

  get status(): SubscriptionStatus {
    return this._status;
  }

  update(
    fields: Partial<{
      durationMonth: SubscriptionDurationMonth;
      status: SubscriptionStatus;
      price: SubscriptionPrice;
    }>,
  ): Subscription {
    return new Subscription(
      this._barbershopId,
      fields.durationMonth || this._durationMonth,
      fields.price || this._price,
      this._startDate,
      this._endDate,
      fields.status || this._status,
      this._id,
    );
  }

  static create(createSubscriptionDto: CreateSubscriptionDto): Subscription {
    return new Subscription(
      new BarberShopId(createSubscriptionDto.barbershopId),
      new SubscriptionDurationMonth(DurationMonth.MONTHLY),
      new SubscriptionPrice(Price.MONTHLY),
      new SubscriptionStartDate(new Date()),
      new SubscriptionEndDate(
        new Date(new Date().setMonth(new Date().getMonth() + 1)),
      ),
      new SubscriptionStatus(Status.PENDING),
    );
  }
}
