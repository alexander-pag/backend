import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ScheduleEndTime {
  constructor(private readonly _value: string) {
    this.validate();
  }

  get value(): string {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('La hora de fin de la cita no puede estar vacía');
    }
    if (typeof this.value !== 'string') {
      throw new DomainError('La hora de fin de la cita debe ser un string');
    }
  }
}
