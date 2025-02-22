import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ServiceIsActive {
  constructor(private readonly _value: boolean) {
    this.validate();
  }

  get value(): boolean {
    return this._value;
  }

  private validate() {
    if (this.value === undefined) {
      throw new DomainError('El estado del servicio no puede estar vacío');
    }

    if (typeof this.value !== 'boolean') {
      throw new DomainError('El estado del servicio no es válido');
    }
  }
}
