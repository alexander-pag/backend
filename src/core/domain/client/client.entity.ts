import { UserId } from '../user/value-objects/userId';
import { ClientId } from './value-objects/clientId';
import { ClientError } from './exceptions/ClientError';
import { CreateClientDto } from 'src/core/application/client/dtos/CreateClientDto';
import { BarberShopId } from '../barberShop/value-objects/barberShopId';
import { ClientIsActive } from './value-objects/clientIsActive';

export class ClientDomain {
  constructor(
    private _userId: UserId,
    private readonly _barberShopId: BarberShopId,
    private readonly _isActive: ClientIsActive,
    private readonly _id?: ClientId,
  ) {
    this.validate();
  }

  get id(): ClientId | undefined {
    return this._id;
  }

  get userId(): UserId {
    return this._userId;
  }

  get barberShopId(): BarberShopId {
    return this._barberShopId;
  }

  get isActive(): ClientIsActive {
    return this._isActive;
  }

  update(
    fields: Partial<{
      userId: UserId;
      isActive: ClientIsActive;
    }>,
  ): ClientDomain {
    return new ClientDomain(
      fields.userId || this._userId,
      this._barberShopId,
      fields.isActive || this._isActive,
      this._id,
    );
  }

  static create(createClientDto: CreateClientDto): ClientDomain {
    return new ClientDomain(
      new UserId(createClientDto.userId),
      new BarberShopId(createClientDto.barberShopId),
      new ClientIsActive(true),
    );
  }

  private validate(): void {
    if (!this._userId) {
      throw new ClientError('El ID del usuario no puede estar vacío.');
    }
  }
}
