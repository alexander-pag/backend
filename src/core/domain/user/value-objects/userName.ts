import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class UserName {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El nombre no puede estar vacío');
    }
    if (this.value.length < 3) {
      throw new DomainError('El nombre no puede tener menos de 3 caracteres');
    }
    if (this.value.length > 50) {
      throw new DomainError('El nombre no puede tener más de 50 caracteres');
    }
  }
}
