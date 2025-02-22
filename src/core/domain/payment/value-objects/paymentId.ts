import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class PaymentId {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El id del pago no puede estar vacío');
    }

    if (!isNaN(Number(this.value))) {
      throw new DomainError('El id del pago no puede ser un número');
    }
  }
}
