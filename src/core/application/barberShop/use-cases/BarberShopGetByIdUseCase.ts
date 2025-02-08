import { IBarberShopRepository } from 'src/core/domain/barberShop/repositories/IBarberShopRepository';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { BarberShopNotFoundError } from '../exceptions/BarberShopNotFoundError';
import { BarberShop } from 'src/core/domain/barberShop/barberShop.entity';

export class BarberShopGetByIdUseCase {
  constructor(private readonly barberShopRepository: IBarberShopRepository) {}

  async execute(barberShopId: string): Promise<BarberShop> {
    const barberShopExists = await this.barberShopRepository.findById(
      new BarberShopId(barberShopId),
    );

    if (!barberShopExists) {
      throw new BarberShopNotFoundError(`La barbería no existe.`);
    }

    return barberShopExists;
  }
}
