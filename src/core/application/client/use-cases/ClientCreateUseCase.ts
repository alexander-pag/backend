import { IClientRepository } from 'src/core/domain/client/repositories/IClientRepository';
import { CreateClientDto } from '../dtos/CreateClientDto';
import { ClientDomain } from 'src/core/domain/client/client.entity';
import { UserCreatedEvent } from 'src/core/domain/user/user-created.event';
import { Roles } from 'src/core/value-objects/user-role/roles';
import { DomainEventDispatcher } from 'src/infrastructure/events/domain-event-dispatcher';

export class ClientCreateUseCase {
  constructor(private readonly clientRepository: IClientRepository) {
    DomainEventDispatcher.register('UserCreated', this.handle.bind(this));
  }

  async handle(event: UserCreatedEvent) {
    if (event.role !== Roles.CLIENT) return;

    const client = ClientDomain.create(
      new CreateClientDto(event.userId, event.barberShopId),
    );

    await this.clientRepository.save(client);
  }
}
