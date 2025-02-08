import { IClientRepository } from 'src/core/domain/client/repositories/IClientRepository';
import { UserId } from 'src/core/domain/user/value-objects/userId';
import { UpdateClientDto } from '../dtos/UpdateClientDto';
import { ClientNotFoundError } from '../exceptions/ClientNotFoundError';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { ClientValidationService } from 'src/core/domain/client/service/ClientValidationService';
import { ClientId } from 'src/core/domain/client/value-objects/clientId';
import { UserNotFoundError } from '../../user/exceptions/UserNotFoundError';

export class ClientUpdateUseCase {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly clientService: ClientValidationService,
    private readonly userService: UserValidationService,
  ) {}

  async execute(id: string, updateClientDto: UpdateClientDto): Promise<void> {
    const existingClient = await this.clientService.exists(new ClientId(id));

    if (!existingClient) {
      throw new ClientNotFoundError('El cliente no existe.');
    }

    const userExists = await this.userService.exists(
      new UserId(updateClientDto.userId),
    );

    if (!userExists) {
      throw new UserNotFoundError('El usuario no existe.');
    }

    const client = await this.clientRepository.findById(new ClientId(id));

    const updatedClient = client.update({
      userId: updateClientDto.userId
        ? new UserId(updateClientDto.userId)
        : undefined,
    });

    await this.clientRepository.save(updatedClient);
  }
}
