import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { NameTooLongError } from 'src/core/exceptions/domain/NameTooLongError';
import { NameTooShortError } from 'src/core/exceptions/domain/NameTooShortError';

export class BarberShopCity {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('La ciudad de la barbería no puede estar vacía');
    }
    if (this.value.length < 3) {
      throw new NameTooShortError(
        'La ciudad de la barbería debe tener al menos 3 caracteres',
      );
    }
    if (this.value.length > 50) {
      throw new NameTooLongError(
        'La ciudad de la barbería no puede tener más de 50 caracteres',
      );
    }
    if (!this.value.match(/^[a-zA-Z\s]*$/)) {
      throw new DomainError(
        'La ciudad de la barbería solo puede contener letras y espacios',
      );
    }
  }
}
