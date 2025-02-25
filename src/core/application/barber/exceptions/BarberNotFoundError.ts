import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class BarberNotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'BarberNotFoundError';
  }
}
