import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class AppointmentDate {
  constructor(private readonly _value: Date) {
    this.validate();
  }

  get value(): Date {
    return this._value;
  }

  private validate() {
    if (!(this._value instanceof Date) || isNaN(this._value.getTime())) {
      throw new DomainError('La fecha de la cita no es válida');
    }
    if (this.value < new Date()) {
      throw new DomainError('La fecha de la cita no puede ser en el pasado');
    }
    if (this.value.getDay() === 0) {
      throw new DomainError('La fecha de la cita no puede ser un domingo');
    }
    if (this.value > new Date(new Date().setDate(new Date().getDate() + 10))) {
      throw new DomainError(
        'La fecha de la cita no puede ser superior a 3 días',
      );
    }
  }
}
