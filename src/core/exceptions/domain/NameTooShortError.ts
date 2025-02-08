import { DomainError } from './DomainError';

export class NameTooShortError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'NameTooShortError';
  }
}
