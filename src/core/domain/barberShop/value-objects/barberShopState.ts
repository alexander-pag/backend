import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class BarberShopState {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError(
        'El departamento de la barbería no puede estar vacío',
      );
    }
    if (this.value.length < 5) {
      throw new DomainError(
        'El nombre del departamento debe tener al menos 5 caracteres',
      );
    }
    if (this.value.length > 50) {
      throw new DomainError(
        'El nombre del departamento debe tener máximo 50 caracteres',
      );
    }
    if (!this.value.match(/^[a-zA-Z\s]*$/)) {
      throw new DomainError(
        'El nombre del departamento solo puede contener letras y espacios',
      );
    }
    if (typeof this.value !== 'string') {
      throw new DomainError('El nombre del departamento debe ser un string');
    }
  }
}
