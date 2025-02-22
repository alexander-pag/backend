import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { Status } from 'src/core/value-objects/payment/status';

export class PaymentStatus {
  constructor(private readonly _value: Status) {
    this.validate();
  }

  get value(): Status {
    return this._value;
  }

  private validate() {
    if (this.value === undefined) {
      throw new DomainError('El estado de pago no puede estar vacío');
    }

    if (!Object.values(Status).includes(this.value)) {
      throw new DomainError('El estado de pago no es válido');
    }
  }
}
