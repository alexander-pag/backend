import { InjectRepository } from '@nestjs/typeorm';
import { ISubscriptionRepository } from 'src/core/domain/subscription/repositories/ISubscriptionRepository';
import { SubscriptionEntity } from '../entities/SubscriptionEntity';
import { Repository } from 'typeorm';
import { Subscription } from 'src/core/domain/subscription/subscription.entity';
import { SubscriptionMapper } from '../mappers/SubscriptionMapper';
import { SubscriptionId } from 'src/core/domain/subscription/value-objects/subscriptionId';

export class SubscriptionRepository implements ISubscriptionRepository {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  async save(subscription: Subscription): Promise<Subscription> {
    const subscriptionEntity = SubscriptionMapper.toEntity(subscription);
    const subscriptionSaved =
      await this.subscriptionRepository.save(subscriptionEntity);

    return SubscriptionMapper.toDomain(subscriptionSaved);
  }

  async findById(id: SubscriptionId): Promise<Subscription | null> {
    const subscriptionEntity = await this.subscriptionRepository.findOne({
      where: {
        id: id.value,
      },
    });

    if (!subscriptionEntity) {
      return null;
    }

    return SubscriptionMapper.toDomain(subscriptionEntity);
  }

  async findAll(): Promise<Subscription[]> {
    const subscriptionEntities = await this.subscriptionRepository.find();

    return subscriptionEntities.map((subscriptionEntity) =>
      SubscriptionMapper.toDomain(subscriptionEntity),
    );
  }

  async delete(id: SubscriptionId): Promise<void> {
    await this.subscriptionRepository.delete({
      id: id.value,
    });
  }
}
