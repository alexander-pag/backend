import { ClientDomain } from 'src/core/domain/client/client.entity';
import { IClientRepository } from 'src/core/domain/client/repositories/IClientRepository';
import { ClientId } from 'src/core/domain/client/value-objects/clientId';
import { ClientNotFoundError } from '../exceptions/ClientNotFoundError';

export class ClientGetByIdUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(id: string): Promise<ClientDomain> {
    const existingClient = await this.clientRepository.findById(
      new ClientId(id),
    );

    if (!existingClient) {
      throw new ClientNotFoundError('El cliente no existe.');
    }

    return existingClient;
  }
}
