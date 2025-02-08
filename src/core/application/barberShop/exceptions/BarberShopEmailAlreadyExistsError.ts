import { ApplicationError } from 'src/core/exceptions/application/ApplicationError';

export class BarberShopEmailAlreadyExistsError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'BarberShopEmailAlreadyExistsError';
  }
}
