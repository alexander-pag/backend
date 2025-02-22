import { Subscription } from 'src/core/domain/subscription/subscription.entity';
import { SubscriptionEntity } from '../entities/SubscriptionEntity';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { SubscriptionDurationMonth } from 'src/core/domain/subscription/value-objects/subscriptionPlan';
import { SubscriptionStartDate } from 'src/core/domain/subscription/value-objects/subscriptionStartDate';
import { SubscriptionEndDate } from 'src/core/domain/subscription/value-objects/subscriptionEndDate';
import { SubscriptionStatus } from 'src/core/domain/subscription/value-objects/subscriptionStatus';
import { SubscriptionId } from 'src/core/domain/subscription/value-objects/subscriptionId';
import { SubscriptionPrice } from 'src/core/domain/subscription/value-objects/subscriptionPrice';

export class SubscriptionMapper {
  static toEntity(subscription: Subscription): SubscriptionEntity {
    const subscriptionEntity = new SubscriptionEntity();

    subscriptionEntity.id = subscription.id?.value;
    subscriptionEntity.barberShopId = subscription.barbershopId.value;
    subscriptionEntity.durationMonth = subscription.durationMonth?.value;
    subscriptionEntity.price = subscription.price?.value;
    subscriptionEntity.startDate = subscription.startDate.value;
    subscriptionEntity.endDate = subscription.endDate.value;
    subscriptionEntity.status = subscription.status?.value;

    return subscriptionEntity;
  }

  static toDomain(subscriptionEntity: SubscriptionEntity): Subscription {
    return new Subscription(
      new BarberShopId(subscriptionEntity.barberShopId),
      new SubscriptionDurationMonth(subscriptionEntity.durationMonth),
      new SubscriptionPrice(subscriptionEntity.price),
      new SubscriptionStartDate(subscriptionEntity.startDate),
      new SubscriptionEndDate(subscriptionEntity.endDate),
      new SubscriptionStatus(subscriptionEntity.status),
      new SubscriptionId(subscriptionEntity.id),
    );
  }
}
