import { DomainError } from './DomainError';

export class NameTooLongError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'NameTooLongError';
  }
}
