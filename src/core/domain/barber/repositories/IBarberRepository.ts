import { Barber } from '../barber.entity';
import { BarberId } from '../value-objects/barberId';

export interface IBarberRepository {
  findById(id: BarberId): Promise<Barber | null>;
  findAll(): Promise<Barber[]>;
  save(client: Barber): Promise<void>;
  delete(id: BarberId): Promise<void>;
}
