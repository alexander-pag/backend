import { IBarberShopRepository } from 'src/core/domain/barberShop/repositories/IBarberShopRepository';
import { CreateBarberShopDto } from '../dto/CreateBarberShopDto';
import { BarberShop } from 'src/core/domain/barberShop/barberShop.entity';
import { BarberShopValidationService } from 'src/core/domain/barberShop/service/BarberShopValidationService';
import { BarberShopEmail } from 'src/core/domain/barberShop/value-objects/barberShopEmail';
import { BarberShopEmailAlreadyExistsError } from '../exceptions/BarberShopEmailAlreadyExistsError';
import { BarberShopPhone } from 'src/core/domain/barberShop/value-objects/barberShopPhone';
import { BarberShopPhoneAlreadyExistsError } from '../exceptions/BarberShopPhoneAlreadyExistsError';
import { BarberShopMapper } from 'src/infrastructure/persistence/mappers/BarberShopMapper';
import { DomainEventDispatcher } from 'src/infrastructure/events/domain-event-dispatcher';
import { BarberShopCreatedEvent } from 'src/core/domain/barberShop/barberShop-created.event';

export class BarberShopCreateUseCase {
  constructor(
    private readonly barberShopRepository: IBarberShopRepository,
    private readonly barberShopService: BarberShopValidationService,
  ) {}

  async execute(createBarberShopDto: CreateBarberShopDto): Promise<void> {
    const { email, phone } = createBarberShopDto;

    const emailExists = await this.barberShopService.isEmailUnique(
      new BarberShopEmail(email),
    );

    if (emailExists) {
      throw new BarberShopEmailAlreadyExistsError(
        `El email ${email} ya se encuentra registrado.`,
      );
    }

    const phoneExists = await this.barberShopService.isPhoneUnique(
      new BarberShopPhone(phone),
    );

    if (phoneExists) {
      throw new BarberShopPhoneAlreadyExistsError(
        `El teléfono ${phone} ya se encuentra registrado.`,
      );
    }

    const barberShop = BarberShop.create(createBarberShopDto);

    const barberShopSaved = await this.barberShopRepository.save(barberShop);

    DomainEventDispatcher.dispatch(
      new BarberShopCreatedEvent(barberShopSaved.id),
    );

    return BarberShopMapper.toPlainObject(barberShopSaved);
  }
}
