import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from '../persistence/entities/SubscriptionEntity';
import { SubscriptionRepository } from '../persistence/repositories/SubscriptionRepository';
import { SubscriptionCreateUseCase } from 'src/core/application/subscription/use-cases/SubscriptionCreateUseCase';
import { SubscriptionController } from '../http/controllers/subscription.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
  providers: [
    {
      provide: 'ISubscriptionRepository',
      useClass: SubscriptionRepository,
    },
    {
      provide: 'SubscriptionUseCases',
      useFactory: (subscriptionRepository: SubscriptionRepository) => ({
        create: new SubscriptionCreateUseCase(subscriptionRepository),
      }),
      inject: ['ISubscriptionRepository'],
    },
  ],
  controllers: [SubscriptionController],
  exports: [],
})
export class SubscriptionModule {}
