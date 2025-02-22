import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { Method } from 'src/core/value-objects/payment/method';

export class PaymentMethod {
  constructor(private readonly _value: Method) {
    this.validate();
  }

  get value(): Method {
    return this._value;
  }

  private validate() {
    if (this.value === undefined) {
      throw new DomainError('El metodo de pago no puede estar vacío');
    }

    if (!Object.values(Method).includes(this.value)) {
      throw new DomainError('El metodo de pago no es válido');
    }
  }
}
