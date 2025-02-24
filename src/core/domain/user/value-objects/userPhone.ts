import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class UserPhone {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El teléfono no puede estar vacío');
    }
    if (typeof this.value !== 'string') {
      throw new DomainError('El teléfono debe ser un string');
    }
    if (this.value.length < 10) {
      throw new DomainError('El teléfono debe tener al menos 10 caracteres');
    }
    if (this.value.length > 10) {
      throw new DomainError('El teléfono no puede tener más de 10 caracteres');
    }
    if (!this.value.match(/^[3]{1}[0-9]{9}$/)) {
      throw new DomainError('El formato del teléfono es incorrecto');
    }
  }
}
