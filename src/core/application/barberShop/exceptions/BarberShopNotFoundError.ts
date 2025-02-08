import { NotFoundError } from 'src/core/exceptions/domain/NotFoundError';

export class BarberShopNotFoundError extends NotFoundError {
  constructor(message: string) {
    super(message);
    this.name = 'BarberShopNotFoundError';
  }
}
