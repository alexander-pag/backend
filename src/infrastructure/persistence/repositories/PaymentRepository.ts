import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaymentRepository } from 'src/core/domain/payment/repositories/IPaymentRepository';
import { PaymentEntity } from '../entities/PaymentEntity';
import { Payment } from 'src/core/domain/payment/payment.entity';
import { PaymentMapper } from '../mappers/PaymentMapper';
import { PaymentId } from 'src/core/domain/payment/value-objects/paymentId';

export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async save(payment: Payment): Promise<Payment> {
    const paymentEntity = PaymentMapper.toEntity(payment);
    const paymentSaved = await this.paymentRepository.save(paymentEntity);

    return PaymentMapper.toDomain(paymentSaved);
  }

  async findById(id: PaymentId): Promise<Payment | null> {
    const paymentEntity = await this.paymentRepository.findOne({
      where: {
        id: id.value,
      },
    });

    if (!paymentEntity) {
      return null;
    }

    return PaymentMapper.toDomain(paymentEntity);
  }

  async findAll(): Promise<Payment[]> {
    const paymentEntities = await this.paymentRepository.find();

    return paymentEntities.map((paymentEntity) =>
      PaymentMapper.toDomain(paymentEntity),
    );
  }

  async delete(id: PaymentId): Promise<void> {
    await this.paymentRepository.delete({
      id: id.value,
    });
  }
}
