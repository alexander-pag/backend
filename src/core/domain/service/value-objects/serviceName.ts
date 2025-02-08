import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { NameTooLongError } from 'src/core/exceptions/domain/NameTooLongError';
import { NameTooShortError } from 'src/core/exceptions/domain/NameTooShortError';

export class ServiceName {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El nombre del servicio no puede estar vacío');
    }
    if (this.value.length < 3) {
      throw new NameTooShortError(
        'El nombre del servicio debe tener al menos 3 caracteres',
      );
    }
    if (this.value.length > 50) {
      throw new NameTooLongError(
        'El nombre del servicio no puede tener más de 50 caracteres',
      );
    }
  }
}
