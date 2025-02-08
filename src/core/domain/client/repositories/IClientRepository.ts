import { Client } from '../../client/client.entity';
import { ClientId } from '../../client/value-objects/clientId';

export interface IClientRepository {
  findById(id: ClientId): Promise<Client | null>;
  findAll(): Promise<Client[]>;
  save(client: Client): Promise<void>;
  delete(id: ClientId): Promise<void>;
}
