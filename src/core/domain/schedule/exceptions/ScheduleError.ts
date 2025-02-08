import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class ScheduleError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ScheduleError';
  }
}
