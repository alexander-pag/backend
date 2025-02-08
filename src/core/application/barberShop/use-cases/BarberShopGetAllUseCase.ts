import { BarberShop } from 'src/core/domain/barberShop/barberShop.entity';
import { IBarberShopRepository } from 'src/core/domain/barberShop/repositories/IBarberShopRepository';

export class BarberShopGetAllUseCase {
  constructor(private readonly barberShopRepository: IBarberShopRepository) {}

  async execute(): Promise<BarberShop[]> {
    return this.barberShopRepository.findAll();
  }
}
