import { BarberDomain } from 'src/core/domain/barber/barber.entity';
import { IBarberRepository } from 'src/core/domain/barber/repositories/IBarberRepository';

export class BarberGetAllUseCase {
  constructor(private readonly barberRepository: IBarberRepository) {}

  async execute(): Promise<BarberDomain[]> {
    return await this.barberRepository.findAll();
  }
}
