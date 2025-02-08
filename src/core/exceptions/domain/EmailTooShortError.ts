import { DomainError } from './DomainError';

export class EmailTooShortError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'EmailTooShortError';
  }
}
