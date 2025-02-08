import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ServiceNotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceNotFoundError';
  }
}
