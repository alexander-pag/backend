import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class UserInvalidCredentialsError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'UserInvalidCredentialsError';
  }
}
