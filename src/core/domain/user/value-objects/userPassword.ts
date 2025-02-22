import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class UserPassword {
  constructor(
    private readonly _value: string,
    private readonly _isHashed = false,
  ) {
    if (!_isHashed) {
      this.validate();
    }
  }

  get value(): string {
    return this._value;
  }

  get isHashed(): boolean {
    return this._isHashed;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('La contraseña no puede estar vacía');
    }
    if (typeof this.value !== 'string') {
      throw new DomainError('La contraseña debe ser un string');
    }
    if (this.value.length < 8) {
      throw new DomainError('La contraseña debe tener al menos 8 caracteres');
    }
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#%*?&])[A-Za-z\d$@$#!%*?&]{8,20}$/;
    if (!regex.test(this.value)) {
      throw new DomainError(
        'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
      );
    }
  }
}
