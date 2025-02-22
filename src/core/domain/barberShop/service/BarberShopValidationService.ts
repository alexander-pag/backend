import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { IBarberShopRepository } from '../repositories/IBarberShopRepository';
import { BarberShopEmail } from '../value-objects/barberShopEmail';
import { BarberShopId } from '../value-objects/barberShopId';
import { BarberShopPhone } from '../value-objects/barberShopPhone';

export class BarberShopValidationService {
  constructor(private readonly barberShopRepository: IBarberShopRepository) {}
  async exists(barberShopId: BarberShopId) {
    const barberShopExists =
      await this.barberShopRepository.findById(barberShopId);

    if (!barberShopExists) {
      throw new DomainError('La barbería no existe');
    }

    return barberShopExists;
  }

  async isEmailUnique(email: BarberShopEmail): Promise<boolean> {
    const user = await this.barberShopRepository.findByEmail(email);

    return !!user;
  }

  async isPhoneUnique(phone: BarberShopPhone): Promise<boolean> {
    const user = await this.barberShopRepository.findByPhone(phone);
    return !!user;
  }
}
