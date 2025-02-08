import { ApplicationError } from 'src/core/exceptions/application/ApplicationError';

export class BarberShopPhoneAlreadyExistsError extends ApplicationError {
  constructor(message: string) {
    super(message);
    this.name = 'BarberShopPhoneAlreadyExistsError';
  }
}
