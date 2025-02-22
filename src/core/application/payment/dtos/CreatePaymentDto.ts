import { Method } from 'src/core/value-objects/payment/method';
import { Status } from 'src/core/value-objects/payment/status';

export class CreatePaymentDto {
  constructor(
    public readonly barbershopId: string,
    public readonly subscriptionId: string,
    public readonly amount: number,
    public readonly status: Status,
    public readonly paymentMethod: Method,
  ) {}
}
