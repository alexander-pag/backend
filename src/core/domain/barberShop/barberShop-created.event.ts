import { DomainEvent } from 'src/infrastructure/events/domain-event';
import { BarberShopId } from './value-objects/barberShopId';

export class BarberShopCreatedEvent implements DomainEvent {
  eventName = 'BarberShopCreated';
  occurredOn = new Date();

  constructor(public readonly barberShopId: BarberShopId) {}
}
