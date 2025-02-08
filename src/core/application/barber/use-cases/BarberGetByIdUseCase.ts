import { Barber } from 'src/core/domain/barber/barber.entity';
import { IBarberRepository } from 'src/core/domain/barber/repositories/IBarberRepository';
import { BarberId } from 'src/core/domain/barber/value-objects/barberId';
import { BarberNotFoundError } from '../exceptions/BarberNotFoundError';

export class BarberGetByIdUseCase {
  constructor(private readonly barberRepository: IBarberRepository) {}

  async execute(id: string): Promise<Barber> {
    const existingBarber = await this.barberRepository.findById(
      new BarberId(id),
    );

    if (!existingBarber) {
      throw new BarberNotFoundError('El barbero no existe.');
    }

    return existingBarber;
  }
}
