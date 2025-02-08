import { Barber } from '../barber.entity';
import { IBarberRepository } from '../repositories/IBarberRepository';
import { BarberId } from '../value-objects/barberId';

export class BarberValidationService {
  constructor(private readonly barberRepository: IBarberRepository) {}

  async exists(barberId: BarberId): Promise<boolean> {
    const barber = await this.barberRepository.findById(barberId);
    return !!barber;
  }

  async save(barber: Barber): Promise<void> {
    await this.barberRepository.save(barber);
  }
}
