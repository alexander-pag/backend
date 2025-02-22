import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ClientIsActive {
  constructor(private readonly _value: boolean) {
    this.validate();
  }

  get value(): boolean {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El estado del cliente no puede estar vacío');
    }

    if (typeof this.value !== 'boolean') {
      throw new DomainError('El estado del clienten no es válido');
    }
  }
}
