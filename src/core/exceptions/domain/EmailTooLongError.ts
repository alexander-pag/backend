import { DomainError } from './DomainError';

export class EmailTooLongError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'EmailTooLongError';
  }
}
