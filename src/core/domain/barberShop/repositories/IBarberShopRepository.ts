import { BarberShop } from '../barberShop.entity';
import { BarberShopEmail } from '../value-objects/barberShopEmail';
import { BarberShopId } from '../value-objects/barberShopId';
import { BarberShopPhone } from '../value-objects/barberShopPhone';

export interface IBarberShopRepository {
  save(barberShop: BarberShop): Promise<BarberShop>;
  delete(barberShopId: BarberShopId): Promise<void>;
  findAll(): Promise<BarberShop[]>;
  findById(barberShopId: BarberShopId): Promise<BarberShop | null>;
  findByEmail(email: BarberShopEmail): Promise<BarberShop | null>;
  findByPhone(phone: BarberShopPhone): Promise<BarberShop | null>;
}
