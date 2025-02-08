import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class AppointmentError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'AppointmentError';
  }
}
