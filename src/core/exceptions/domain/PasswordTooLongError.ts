import { DomainError } from './DomainError';

export class PasswordTooLongError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'PasswordTooLongError';
  }
}
