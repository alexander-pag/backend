import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class UserEmail {
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
    if (this.value.length < 5) {
      throw new DomainError('El correo no puede tener menos de 5 caracteres');
    }
    if (this.value.length > 50) {
      throw new DomainError('El correo no puede tener más de 50 caracteres');
    }
  }
}
