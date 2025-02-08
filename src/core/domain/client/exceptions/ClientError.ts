import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ClientError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ClientError';
  }
}
