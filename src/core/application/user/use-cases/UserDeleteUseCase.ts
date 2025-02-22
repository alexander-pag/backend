import { IUserRepository } from 'src/core/domain/user/repositories/IUserRepository';
import { UserId } from 'src/core/domain/user/value-objects/userId';
import { DomainEventDispatcher } from 'src/infrastructure/events/domain-event-dispatcher';
import { ClientCreatedFailedEvent } from 'src/core/domain/client/client-created-failed.event';

export class UserDeleteUseCase {
  constructor(private readonly userRepository: IUserRepository) {
    DomainEventDispatcher.register(
      'ClientCreatedFailed',
      this.handle.bind(this),
    );
  }

  async handle(event: ClientCreatedFailedEvent): Promise<void> {
    await this.userRepository.delete(new UserId(event.userId));
  }
}
