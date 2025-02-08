import { ClientEntity } from '../entities/ClientEntity';
import { Client } from 'src/core/domain/client/client.entity';
import { UserId } from 'src/core/domain/user/value-objects/userId';

export class ClientMapper {
  static toEntity(client: Client): ClientEntity {
    console.log('client', client);

    const clientEntity = new ClientEntity();

    clientEntity.id = client.id?.value;
    clientEntity.userId = client.userId.value;

    return clientEntity;
  }

  static toDomain(clientEntity: ClientEntity): Client {
    return new Client(new UserId(clientEntity.userId));
  }
}
