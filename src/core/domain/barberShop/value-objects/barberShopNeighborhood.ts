import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { NameTooLongError } from 'src/core/exceptions/domain/NameTooLongError';
import { NameTooShortError } from 'src/core/exceptions/domain/NameTooShortError';

export class BarberShopNeighborhood {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (this.value.length < 5) {
      throw new NameTooShortError(
        'El nombre del barrio debe tener mínimo 5 caracteres',
      );
    }
    if (this.value.length > 50) {
      throw new NameTooLongError(
        'El nombre del barrio debe tener máximo 50 caracteres',
      );
    }
  }
}
