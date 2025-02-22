import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class BarberShopNeighborhood {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El nombre del barrio no puede estar vacío');
    }
    if (this.value.length < 5) {
      throw new DomainError(
        'El nombre del barrio debe tener mínimo 5 caracteres',
      );
    }
    if (this.value.length > 50) {
      throw new DomainError(
        'El nombre del barrio debe tener máximo 50 caracteres',
      );
    }
    if (typeof this.value !== 'string') {
      throw new DomainError('El nombre del barrio debe ser un string');
    }
  }
}
