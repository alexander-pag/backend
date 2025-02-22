import { ClientDomain } from '../client.entity';
import { IClientRepository } from '../repositories/IClientRepository';
import { ClientId } from '../value-objects/clientId';

export class ClientValidationService {
  constructor(private readonly clientRepository: IClientRepository) {}

  async exists(clientId: ClientId): Promise<boolean> {
    const client = await this.clientRepository.findById(clientId);
    return !!client;
  }

  async save(client: ClientDomain): Promise<void> {
    await this.clientRepository.save(client);
  }
}
