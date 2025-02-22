import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../persistence/entities/PaymentEntity';
import { PaymentRepository } from '../persistence/repositories/PaymentRepository';
import { PaymentCreateUseCase } from 'src/core/application/payment/use-cases/PaymentCreateUseCase';
import { PaymentController } from '../http/controllers/payment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  providers: [
    {
      provide: 'IPaymentRepository',
      useClass: PaymentRepository,
    },
    {
      provide: 'PaymentUseCases',
      useFactory: (paymentRepository: PaymentRepository) => ({
        create: new PaymentCreateUseCase(paymentRepository),
      }),
      inject: ['IPaymentRepository'],
    },
  ],
  controllers: [PaymentController],
  exports: [],
})
export class PaymentModule {}
