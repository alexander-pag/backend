import { IClientRepository } from 'src/core/domain/client/repositories/IClientRepository';
import { ClientValidationService } from 'src/core/domain/client/service/ClientValidationService';
import { ClientNotFoundError } from '../exceptions/ClientNotFoundError';
import { ClientId } from 'src/core/domain/client/value-objects/clientId';

export class ClientDeleteUseCase {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly clientService: ClientValidationService,
  ) {}

  async execute(id: string): Promise<void> {
    const existingClient = await this.clientService.exists(new ClientId(id));

    if (!existingClient) {
      throw new ClientNotFoundError('El cliente no existe.');
    }

    await this.clientRepository.delete(new ClientId(id));
  }
}
