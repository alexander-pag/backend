import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { EmailTooShortError } from 'src/core/exceptions/domain/EmailTooShortError';

export class BarberShopEmail {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El correo no puede estar vacío');
    }
    if (!this.value.includes('@')) {
      throw new DomainError('El correo debe tener un @');
    }
    if (this.value.length < 10) {
      throw new EmailTooShortError(
        'El correo no puede tener menos de 10 caracteres',
      );
    }
    if (this.value.length > 50) {
      throw new DomainError('El correo no puede tener más de 50 caracteres');
    }
    if (typeof this.value !== 'string') {
      throw new DomainError('El correo debe ser una cadena de texto');
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.value)) {
      throw new DomainError('El formato del correo es incorrecto');
    }
  }
}
