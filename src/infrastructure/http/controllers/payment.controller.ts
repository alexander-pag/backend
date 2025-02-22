import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreatePaymentDto } from 'src/core/application/payment/dtos/CreatePaymentDto';
import { PaymentCreateUseCase } from 'src/core/application/payment/use-cases/PaymentCreateUseCase';

@Controller('payment')
export class PaymentController {
  constructor(
    @Inject('PaymentUseCases')
    private readonly paymentUseCases: {
      create: PaymentCreateUseCase;
    },
  ) {}

  @Post()
  async createUser(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      return await this.paymentUseCases.create.execute(createPaymentDto);
    } catch (error) {
      console.error(error);
    }
  }
}
