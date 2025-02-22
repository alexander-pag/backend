import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { IClientRepository } from 'src/core/domain/client/repositories/IClientRepository';
import { ClientEntity } from '../entities/ClientEntity';
import { ClientId } from 'src/core/domain/client/value-objects/clientId';
import { ClientDomain } from 'src/core/domain/client/client.entity';
import { ClientMapper } from '../mappers/ClientMapper';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
  ) {}

  async findById(id: ClientId): Promise<ClientDomain | null> {
    const clientEntity = await this.clientRepository.findOne({
      where: { id: id.value },
    });

    if (!clientEntity) {
      return null;
    }

    return ClientMapper.toDomain(clientEntity);
  }

  async findAll(): Promise<ClientDomain[]> {
    const clientEntities = await this.clientRepository.find();

    return clientEntities.map((clientEntity) =>
      ClientMapper.toDomain(clientEntity),
    );
  }

  async save(client: ClientDomain): Promise<ClientDomain> {
    const clientEntity = ClientMapper.toEntity(client);
    await this.clientRepository.save(clientEntity);

    return client;
  }

  async delete(id: ClientId): Promise<void> {
    await this.clientRepository.delete({
      id: id.value,
    });
  }

  private async performTransaction<T>(
    operation: (manager: EntityManager) => Promise<T>,
  ): Promise<T> {
    return await this.clientRepository.manager.transaction(async (manager) => {
      try {
        return await operation(manager);
      } catch (error) {
        throw error;
      }
    });
  }
}
