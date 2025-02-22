import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { Roles } from 'src/core/value-objects/user-role/roles';

export class UserRole {
  constructor(private readonly _value: Roles) {
    this.validate();
  }

  get value(): Roles {
    return this._value;
  }

  private validate(): void {
    if (!this._value) {
      throw new DomainError('El rol del usuario no puede estar vacío');
    }
    if (typeof this._value !== 'string') {
      throw new DomainError('El rol del usuario debe ser un string');
    }
    if (!Object.values(Roles).includes(this._value)) {
      throw new DomainError('El rol del usuario no es válido');
    }
  }
}
