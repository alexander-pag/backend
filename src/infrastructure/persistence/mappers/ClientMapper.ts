import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { ClientEntity } from '../entities/ClientEntity';
import { ClientDomain } from 'src/core/domain/client/client.entity';
import { UserId } from 'src/core/domain/user/value-objects/userId';
import { ClientId } from 'src/core/domain/client/value-objects/clientId';
import { ClientIsActive } from 'src/core/domain/client/value-objects/clientIsActive';

export class ClientMapper {
  static toEntity(client: ClientDomain): ClientEntity {
    const clientEntity = new ClientEntity();

    clientEntity.id = client.id?.value;
    clientEntity.userId = client.userId.value;
    clientEntity.barberShopId = client.barberShopId.value;

    return clientEntity;
  }

  static toDomain(clientEntity: ClientEntity): ClientDomain {
    return new ClientDomain(
      new UserId(clientEntity.userId),
      new BarberShopId(clientEntity.barberShopId),
      new ClientIsActive(clientEntity.isActive),
      new ClientId(clientEntity.id),
    );
  }

  static toPlainObject(client: ClientDomain): any {
    return {
      id: client.id?.value,
      userId: client.userId.value,
      barberShopId: client.barberShopId.value,
      isActive: client.isActive.value,
    };
  }
}
