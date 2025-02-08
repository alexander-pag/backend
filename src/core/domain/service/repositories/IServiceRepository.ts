import { BarberShopId } from '../../barberShop/value-objects/barberShopId';
import { Service } from '../service.entity';
import { ServiceId } from '../value-objects/serviceId';

export interface IServiceRepository {
  findById(id: ServiceId): Promise<Service | null>;
  findAll(): Promise<Service[]>;
  findAllByBarberShopId(barberShopId: BarberShopId): Promise<Service[]>;
  save(service: Service): Promise<void>;
  delete(id: ServiceId): Promise<void>;
}
