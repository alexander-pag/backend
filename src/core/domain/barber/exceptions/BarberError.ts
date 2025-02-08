import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class BarberError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'BarberError';
  }
}
