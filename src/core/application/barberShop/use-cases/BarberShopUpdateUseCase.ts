import { IBarberShopRepository } from 'src/core/domain/barberShop/repositories/IBarberShopRepository';
import { BarberShopValidationService } from 'src/core/domain/barberShop/service/BarberShopValidationService';
import { BarberShopEmail } from 'src/core/domain/barberShop/value-objects/barberShopEmail';
import { BarberShopEmailAlreadyExistsError } from '../exceptions/BarberShopEmailAlreadyExistsError';
import { BarberShopPhone } from 'src/core/domain/barberShop/value-objects/barberShopPhone';
import { BarberShopPhoneAlreadyExistsError } from '../exceptions/BarberShopPhoneAlreadyExistsError';
import { UpdateBarberShopDto } from '../dto/UpdateBarberShopDto';
import { BarberShopNotFoundError } from '../exceptions/BarberShopNotFoundError';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { BarberShopAddress } from 'src/core/domain/barberShop/value-objects/barberShopAddress';
import { BarberShopCity } from 'src/core/domain/barberShop/value-objects/barberShopCity';
import { BarberShopName } from 'src/core/domain/barberShop/value-objects/barberShopName';
import { BarberShopNeighborhood } from 'src/core/domain/barberShop/value-objects/barberShopNeighborhood';
import { BarberShopState } from 'src/core/domain/barberShop/value-objects/barberShopState';
import { BarberShopSubscriptionStatus } from 'src/core/domain/barberShop/value-objects/barberShopSubscriptionStatus';

export class BarberShopUpdateUseCase {
  constructor(
    private readonly barberShopRepository: IBarberShopRepository,
    private readonly barberShopService: BarberShopValidationService,
  ) {}

  async execute(
    id: string,
    updateBarberShopDto: UpdateBarberShopDto,
  ): Promise<void> {
    const { email, phone } = updateBarberShopDto;

    const barberShopExists = await this.barberShopService.exists(
      new BarberShopId(id),
    );

    if (!barberShopExists) {
      throw new BarberShopNotFoundError(`La barbería no existe.`);
    }

    if (email) {
      const emailExists = await this.barberShopService.isEmailUnique(
        new BarberShopEmail(email),
      );

      if (emailExists) {
        throw new BarberShopEmailAlreadyExistsError(
          `El email ${email} ya se encuentra registrado.`,
        );
      }
    }

    if (phone) {
      const phoneExists = await this.barberShopService.isPhoneUnique(
        new BarberShopPhone(phone),
      );

      if (phoneExists) {
        throw new BarberShopPhoneAlreadyExistsError(
          `El teléfono ${phone} ya se encuentra registrado.`,
        );
      }
    }

    const barberShop = await this.barberShopRepository.findById(
      new BarberShopId(id),
    );

    const updatedBarberShop = barberShop.update({
      address: updateBarberShopDto.address
        ? new BarberShopAddress(updateBarberShopDto.address)
        : undefined,
      email: updateBarberShopDto.email
        ? new BarberShopEmail(updateBarberShopDto.email)
        : undefined,
      phone: updateBarberShopDto.phone
        ? new BarberShopPhone(updateBarberShopDto.phone)
        : undefined,
      city: updateBarberShopDto.city
        ? new BarberShopCity(updateBarberShopDto.city)
        : undefined,
      name: updateBarberShopDto.name
        ? new BarberShopName(updateBarberShopDto.name)
        : undefined,
      neighborhood: updateBarberShopDto.neighborhood
        ? new BarberShopNeighborhood(updateBarberShopDto.neighborhood)
        : undefined,
      state: updateBarberShopDto.state
        ? new BarberShopState(updateBarberShopDto.state)
        : undefined,
      subscriptionStatus: updateBarberShopDto.subscriptionStatus
        ? new BarberShopSubscriptionStatus(
            updateBarberShopDto.subscriptionStatus,
          )
        : undefined,
    });
  }
}
