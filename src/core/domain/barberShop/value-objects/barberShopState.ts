import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class BarberShopState {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (this.value.length < 2 || this.value.length > 100) {
      throw new DomainError(
        'El nombre del departamento debe tener entre 2 y 100 caracteres',
      );
    }
  }
}
