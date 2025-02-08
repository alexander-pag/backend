import { IBarberRepository } from 'src/core/domain/barber/repositories/IBarberRepository';
import { BarberValidationService } from 'src/core/domain/barber/service/BarberValidationService';
import { BarberNotFoundError } from '../exceptions/BarberNotFoundError';
import { BarberId } from 'src/core/domain/barber/value-objects/barberId';

export class BarberDeleteUseCase {
  constructor(
    private readonly barberRepository: IBarberRepository,
    private readonly barberService: BarberValidationService,
  ) {}
  async execute(barberId: string): Promise<void> {
    const existingBarber = await this.barberService.exists(
      new BarberId(barberId),
    );

    if (!existingBarber) {
      throw new BarberNotFoundError('El barbero no existe.');
    }

    await this.barberRepository.delete(new BarberId(barberId));
  }
}
