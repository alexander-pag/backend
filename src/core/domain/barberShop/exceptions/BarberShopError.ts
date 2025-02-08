import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class BarberShopError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'BarberShopError';
  }
}
