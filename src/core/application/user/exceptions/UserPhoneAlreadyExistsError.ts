import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class UserPhoneAlreadyExistsError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'UserPhoneAlreadyExistsError';
  }
}
