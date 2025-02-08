import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class UserNotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}
