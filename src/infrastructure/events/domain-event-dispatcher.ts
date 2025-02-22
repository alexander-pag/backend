import { DomainEvent } from './domain-event';

export class DomainEventDispatcher {
  private static listeners: {
    [event: string]: ((event: DomainEvent) => void)[];
  } = {};

  static register(eventName: string, callback: (event: DomainEvent) => void) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(callback);
  }

  static dispatch(event: DomainEvent) {
    if (this.listeners[event.eventName]) {
      this.listeners[event.eventName].forEach((callback) => callback(event));
    }
  }
}
