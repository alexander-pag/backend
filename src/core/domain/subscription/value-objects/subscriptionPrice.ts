import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class SubscriptionPrice {
  constructor(private readonly _value: number) {
    this.validate();
  }

  get value(): number {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El precio de la suscripción no puede estar vacío');
    }
    if (this.value <= 0) {
      throw new DomainError(
        'El precio de la suscripción no puede ser menor o igual a 0',
      );
    }
    if (isNaN(this.value)) {
      throw new DomainError('El precio de la suscripción debe ser un número');
    }
  }
}
