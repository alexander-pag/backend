import { IPaymentRepository } from 'src/core/domain/payment/repositories/IPaymentRepository';
import { CreatePaymentDto } from '../dtos/CreatePaymentDto';
import { Payment } from 'src/core/domain/payment/payment.entity';

export class PaymentCreateUseCase {
  constructor(private readonly paymentRepository: IPaymentRepository) {}

  async execute(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = Payment.create(createPaymentDto);

    return this.paymentRepository.save(payment);
  }
}
