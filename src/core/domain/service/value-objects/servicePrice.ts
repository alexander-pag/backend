import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ServicePrice {
  constructor(private readonly _value: number) {
    this.validate();
  }

  get value(): number {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El precio del servicio no puede estar vacío');
    }
    if (isNaN(Number(this.value))) {
      throw new DomainError('El precio del servicio debe ser un número');
    }
    if (this.value < 0) {
      throw new DomainError('El precio del servicio no puede ser negativo');
    }
  }
}
