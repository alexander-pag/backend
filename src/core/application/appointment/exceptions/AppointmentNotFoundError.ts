import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class AppointmentNotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'AppointmentNotFoundError';
  }
}
