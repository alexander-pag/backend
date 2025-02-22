import { DurationMonth } from 'src/core/value-objects/subscription/durationMonth';
import { Price } from 'src/core/value-objects/subscription/price';
import { Status } from 'src/core/value-objects/subscription/status';

export class UpdateSubscriptionDto {
  constructor(
    public readonly barbershopId?: string,
    public readonly durationMonth?: DurationMonth,
    public readonly price?: Price,
    public readonly status?: Status,
  ) {}
}
