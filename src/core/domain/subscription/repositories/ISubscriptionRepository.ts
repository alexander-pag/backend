import { Subscription } from '../subscription.entity';
import { SubscriptionId } from '../value-objects/subscriptionId';

export interface ISubscriptionRepository {
  findById(subscriptionId: SubscriptionId): Promise<Subscription | null>;
  findAll(): Promise<Subscription[]>;
  save(subscription: Subscription): Promise<Subscription>;
  delete(subscriptionId: SubscriptionId): Promise<void>;
}
