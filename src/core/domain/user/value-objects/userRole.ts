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
      throw new Error('El rol proporcionado no es válido.');
    }
  }
}
