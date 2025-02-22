import { ISubscriptionRepository } from '../repositories/ISubscriptionRepository';
import { Subscription } from '../subscription.entity';

export class SubscriptionValidationService {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {}

  async save(subscription: Subscription): Promise<void> {
    await this.subscriptionRepository.save(subscription);
  }
}
