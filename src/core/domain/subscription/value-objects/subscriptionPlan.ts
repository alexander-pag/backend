import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { DurationMonth } from 'src/core/value-objects/subscription/durationMonth';

export class SubscriptionDurationMonth {
  constructor(private readonly _value: DurationMonth) {
    this.validate();
  }

  get value(): DurationMonth {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El plan de la subscripción no puede estar vacío.');
    }
    if (!Object.values(DurationMonth).includes(this.value)) {
      throw new DomainError('El plan de la subscripción no es válido.');
    }
  }
}
