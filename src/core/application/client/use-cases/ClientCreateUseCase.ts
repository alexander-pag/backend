import { IClientRepository } from 'src/core/domain/client/repositories/IClientRepository';
import { CreateClientDto } from '../dtos/CreateClientDto';
import { Client } from 'src/core/domain/client/client.entity';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { UserId } from 'src/core/domain/user/value-objects/userId';
import { UserNotFoundError } from '../../user/exceptions/UserNotFoundError';

export class ClientCreateUseCase {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly userService: UserValidationService,
  ) {}

  async execute(createClientDto: CreateClientDto): Promise<void> {
    const userExists = await this.userService.exists(
      new UserId(createClientDto.userId),
    );

    if (!userExists) {
      throw new UserNotFoundError('El usuario no existe.');
    }

    const client = Client.create(createClientDto);

    await this.clientRepository.save(client);
  }
}
