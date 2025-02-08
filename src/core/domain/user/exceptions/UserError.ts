import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class UserError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'UserError';
  }
}
