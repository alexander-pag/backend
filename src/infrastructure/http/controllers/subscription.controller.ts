import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateSubscriptionDto } from 'src/core/application/subscription/dtos/CreateSubscriptionDto';
import { SubscriptionCreateUseCase } from 'src/core/application/subscription/use-cases/SubscriptionCreateUseCase';

@Controller('subscription')
export class SubscriptionController {
  constructor(
    @Inject('SubscriptionUseCases')
    private readonly subscriptionUseCases: {
      create: SubscriptionCreateUseCase;
    },
  ) {}

  @Post()
  async createUser(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    try {
      // return await this.subscriptionUseCases.create.execute(createSubscriptionDto);
    } catch (error) {
      console.error(error);
    }
  }
}
