import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ServiceDuration {
  constructor(private readonly _value: number) {
    this.validate();
  }

  get value(): number {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('La duración del servicio no puede estar vacía');
    }

    if (typeof this.value !== 'number') {
      throw new DomainError('La duración del servicio no es válida');
    }
  }
}
