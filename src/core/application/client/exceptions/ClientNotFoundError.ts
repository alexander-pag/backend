import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ClientNotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ClientNotFoundError';
  }
}
