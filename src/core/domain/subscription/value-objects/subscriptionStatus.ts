import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { Status } from 'src/core/value-objects/subscription/status';

export class SubscriptionStatus {
  constructor(private readonly _value: Status) {
    this.validate();
  }

  get value(): Status {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError(
        'El estado de la subscripción no puede estar vacío.',
      );
    }
    if (!Object.values(Status).includes(this.value)) {
      throw new DomainError('El estado de la subscripción no es válido.');
    }
  }
}
