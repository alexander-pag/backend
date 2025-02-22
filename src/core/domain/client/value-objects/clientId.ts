import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ClientId {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate(): void {
    if (!this.value) {
      throw new DomainError('El id del cliente no puede estar vacío.');
    }
    if (typeof this.value !== 'string') {
      throw new DomainError('El id del cliente debe ser un string.');
    }
  }
}
