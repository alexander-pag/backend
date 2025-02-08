import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class UserEmailAlreadyExistsError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'UserEmailAlreadyExistsError';
  }
}
