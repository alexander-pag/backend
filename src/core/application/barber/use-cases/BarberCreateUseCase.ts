import { IBarberRepository } from 'src/core/domain/barber/repositories/IBarberRepository';
import { BarberDomain } from 'src/core/domain/barber/barber.entity';
import { DomainEventDispatcher } from 'src/infrastructure/events/domain-event-dispatcher';
import { UserCreatedEvent } from 'src/core/domain/user/user-created.event';
import { Roles } from 'src/core/value-objects/user-role/roles';
import { CreateClientDto } from '../../client/dtos/CreateClientDto';

export class BarberCreateUseCase {
  constructor(private readonly barberRepository: IBarberRepository) {
    DomainEventDispatcher.register('UserCreated', this.handle.bind(this));
  }

  async handle(event: UserCreatedEvent) {
    if (event.role !== Roles.BARBER) return;

    const barber = BarberDomain.create(
      new CreateClientDto(event.userId, event.barberShopId),
    );
    await this.barberRepository.save(barber);
  }
}
