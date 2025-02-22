import { DomainEvent } from 'src/infrastructure/events/domain-event';

export class ClientCreatedFailedEvent implements DomainEvent {
  eventName = 'ClientCreatedFailed';
  occurredOn = new Date();

  constructor(public readonly userId: string) {}
}
