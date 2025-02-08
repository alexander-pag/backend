import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { SubscriptionStatus } from 'src/core/value-objects/barberShop/subscriptionStatus';

export class BarberShopSubscriptionStatus {
  constructor(private readonly _value: SubscriptionStatus) {
    this.validate();
  }

  get value(): SubscriptionStatus {
    return this._value;
  }

  private validate() {
    if (this.value === undefined) {
      throw new DomainError('El estado de la suscripción no puede estar vacío');
    }

    if (!Object.values(SubscriptionStatus).includes(this.value)) {
      throw new DomainError('El estado de la suscripción no es válido');
    }
  }
}
