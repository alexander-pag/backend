import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ClientId {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate(): void {
    if (!this._value) {
      throw new DomainError('El ID del cliente no puede estar vacío.');
    }
  }
}
