import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { DayOfWeek } from 'src/core/value-objects/schedule/dayOfWeek';

export class ScheduleDayOfWeek {
  constructor(private readonly _value: DayOfWeek) {
    this.validate();
  }

  get value(): DayOfWeek {
    return this._value;
  }

  private validate() {
    if (!this.value) {
      throw new DomainError('El día de la semana no puede estar vacío.');
    }
    if (!Object.values(DayOfWeek).includes(this.value)) {
      throw new DomainError('El día de la semana no es válido.');
    }
  }
}
