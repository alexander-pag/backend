import { DomainError } from './DomainError';

export class PasswordTooShortError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'PasswordTooShortError';
  }
}
