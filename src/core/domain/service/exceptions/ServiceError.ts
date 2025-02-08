import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ServiceError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceError';
  }
}
