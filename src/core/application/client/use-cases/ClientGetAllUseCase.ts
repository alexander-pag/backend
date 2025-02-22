import { ClientDomain } from 'src/core/domain/client/client.entity';
import { IClientRepository } from 'src/core/domain/client/repositories/IClientRepository';

export class ClientGetAllUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async execute(): Promise<ClientDomain[]> {
    return await this.clientRepository.findAll();
  }
}
