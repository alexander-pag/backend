import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class PaymentAmount {
  constructor(private readonly _value: number) {
    this.validate();
  }

  get value(): number {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El monto del pago no puede estar vacío');
    }
    if (this.value <= 0) {
      throw new DomainError('El monto del pago no puede ser menor o igual a 0');
    }
    if (isNaN(this.value)) {
      throw new DomainError('El monto del pago debe ser un número');
    }
  }
}
