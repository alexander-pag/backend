import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class BarberShopAddress {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('La dirección de la barbería no puede estar vacía');
    }
    if (this.value.length < 5) {
      throw new DomainError(
        'La dirección de la barbería debe tener al menos 5 caracteres',
      );
    }
    if (this.value.length > 100) {
      throw new DomainError(
        'La dirección de la barbería no puede tener más de 100 caracteres',
      );
    }
    if (!this.value.match(/^[a-zA-Z0-9.\s#,-]*$/)) {
      throw new DomainError(
        'La dirección de la barbería solo puede contener letras, números y espacios',
      );
    }
    if (typeof this.value !== 'string') {
      throw new DomainError('La dirección de la barbería debe ser un string');
    }
  }
}
