import { DomainEvent } from 'src/infrastructure/events/domain-event';
import { Roles } from 'src/core/value-objects/user-role/roles';

export class UserCreatedEvent implements DomainEvent {
  eventName = 'UserCreated';
  occurredOn = new Date();

  constructor(
    public readonly userId: string,
    public readonly barberShopId: string,
    public readonly role: Roles,
  ) {}
}
