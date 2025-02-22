import { ISubscriptionRepository } from 'src/core/domain/subscription/repositories/ISubscriptionRepository';
import { Subscription } from 'src/core/domain/subscription/subscription.entity';
import { DomainEventDispatcher } from 'src/infrastructure/events/domain-event-dispatcher';
import { SubscriptionCreatedEvent } from '../subscription-created.event';
import { Status } from 'src/core/value-objects/subscription/status';
import { SubscriptionDurationMonth } from 'src/core/domain/subscription/value-objects/subscriptionPlan';
import { DurationMonth } from 'src/core/value-objects/subscription/durationMonth';
import { SubscriptionStartDate } from 'src/core/domain/subscription/value-objects/subscriptionStartDate';
import { SubscriptionEndDate } from 'src/core/domain/subscription/value-objects/subscriptionEndDate';
import { SubscriptionStatus } from 'src/core/domain/subscription/value-objects/subscriptionStatus';
import { Price } from 'src/core/value-objects/subscription/price';
import { SubscriptionPrice } from 'src/core/domain/subscription/value-objects/subscriptionPrice';

export class SubscriptionCreateUseCase {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {
    DomainEventDispatcher.register('BarberShopCreated', this.handle.bind(this));
  }

  async handle(event: SubscriptionCreatedEvent) {
    const subscription = new Subscription(
      event.barberShopId,
      new SubscriptionDurationMonth(DurationMonth.MONTHLY),
      new SubscriptionPrice(Price.MONTHLY),
      new SubscriptionStartDate(new Date()),
      new SubscriptionEndDate(
        new Date(new Date().setMonth(new Date().getMonth() + 1)),
      ),
      new SubscriptionStatus(Status.PENDING),
    );
    const subscriptionSaved =
      await this.subscriptionRepository.save(subscription);

    DomainEventDispatcher.dispatch(
      new SubscriptionCreatedEvent(event.barberShopId, subscriptionSaved.id),
    );
  }
}
