import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class SubscriptionId {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El id de la subscripción no puede estar vacío');
    }
    if (typeof this.value !== 'string') {
      throw new DomainError('El id de la subscripción debe ser un string');
    }
  }
}
