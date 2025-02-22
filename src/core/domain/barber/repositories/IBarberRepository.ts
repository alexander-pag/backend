import { BarberDomain } from '../barber.entity';
import { BarberId } from '../value-objects/barberId';

export interface IBarberRepository {
  findById(id: BarberId): Promise<BarberDomain | null>;
  findAll(): Promise<BarberDomain[]>;
  save(client: BarberDomain): Promise<void>;
  delete(id: BarberId): Promise<void>;
}
