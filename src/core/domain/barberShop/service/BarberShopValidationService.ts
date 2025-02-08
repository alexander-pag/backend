import { IBarberShopRepository } from '../repositories/IBarberShopRepository';
import { BarberShopEmail } from '../value-objects/barberShopEmail';
import { BarberShopId } from '../value-objects/barberShopId';
import { BarberShopPhone } from '../value-objects/barberShopPhone';

export class BarberShopValidationService {
  constructor(private readonly barberShopRepository: IBarberShopRepository) {}
  async exists(barberShopId: BarberShopId): Promise<boolean> {
    const barberShopExists =
      await this.barberShopRepository.findById(barberShopId);

    return !!barberShopExists;
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
