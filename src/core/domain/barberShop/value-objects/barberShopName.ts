import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class BarberShopName {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El nombre de la barbería no puede estar vacío');
    }
    if (this.value.length < 5) {
      throw new DomainError(
        'El nombre de la barbería debe tener al menos 5 caracteres',
      );
    }
    if (this.value.length > 50) {
      throw new DomainError(
        'El nombre de la barbería no puede tener más de 50 caracteres',
      );
    }
    if (typeof this.value !== 'string') {
      throw new DomainError('El nombre de la barbería debe ser un string');
    }
  }
}
