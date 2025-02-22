import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class SubscriptionStartDate {
  constructor(private readonly _value: Date) {
    this.validate();
  }

  get value(): Date {
    return this._value;
  }

  private validate() {
    if (!this._value) {
      throw new DomainError(
        'La fecha de inicio de la subscripción no puede estar vacía',
      );
    }
    if (!(this._value instanceof Date) || isNaN(this._value.getTime())) {
      throw new DomainError(
        'La fecha de inicio de la subscripción no es válida',
      );
    }
  }
}
