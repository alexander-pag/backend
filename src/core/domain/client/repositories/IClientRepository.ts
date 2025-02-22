import { ClientDomain } from '../../client/client.entity';
import { ClientId } from '../../client/value-objects/clientId';

export interface IClientRepository {
  findById(id: ClientId): Promise<ClientDomain | null>;
  findAll(): Promise<ClientDomain[]>;
  save(client: ClientDomain): Promise<ClientDomain | null>;
  delete(id: ClientId): Promise<void>;
}
