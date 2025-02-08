import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ScheduleStartTime {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError(
        'La hora de inicio de la cita no puede estar vacía',
      );
    }
  }
}
