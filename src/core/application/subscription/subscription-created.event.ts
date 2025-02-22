import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { SubscriptionId } from 'src/core/domain/subscription/value-objects/subscriptionId';
import { DomainEvent } from 'src/infrastructure/events/domain-event';

export class SubscriptionCreatedEvent implements DomainEvent {
  eventName = 'SubscriptionCreated';
  occurredOn = new Date();

  constructor(
    public readonly barberShopId: BarberShopId,
    public readonly subscriptionId: SubscriptionId,
  ) {}
}
