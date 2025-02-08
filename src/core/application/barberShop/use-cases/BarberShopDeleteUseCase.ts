import { IBarberShopRepository } from 'src/core/domain/barberShop/repositories/IBarberShopRepository';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { BarberShopNotFoundError } from '../exceptions/BarberShopNotFoundError';

export class BarberShopDeleteUseCase {
  constructor(private readonly barberShopRepository: IBarberShopRepository) {}

  async execute(barberShopId: string): Promise<void> {
    const barberShop = await this.barberShopRepository.findById(
      new BarberShopId(barberShopId),
    );

    if (!barberShop) {
      throw new BarberShopNotFoundError(`La barbería no existe.`);
    }

    await this.barberShopRepository.delete(new BarberShopId(barberShopId));
  }
}
