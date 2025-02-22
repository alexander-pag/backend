import { IBarberShopRepository } from 'src/core/domain/barberShop/repositories/IBarberShopRepository';
import { DomainEventDispatcher } from 'src/infrastructure/events/domain-event-dispatcher';
import { SubscriptionCreatedEvent } from '../../subscription/subscription-created.event';

export class AssignSubscriptionToBarberShopUseCase {
  constructor(private readonly barberShopRepository: IBarberShopRepository) {
    DomainEventDispatcher.register(
      'SubscriptionCreated',
      this.handle.bind(this),
    );
  }

  async handle(event: SubscriptionCreatedEvent) {
    const barberShop = await this.barberShopRepository.findById(
      event.barberShopId,
    );

    console.log('Assigning subscription to barber shop', event.subscriptionId);

    barberShop.assignSubscription(event.subscriptionId);
    await this.barberShopRepository.save(barberShop);
  }
}
