import { UserId } from '../user/value-objects/userId';
import { ClientId } from './value-objects/clientId';
import { ClientError } from './exceptions/ClientError';
import { CreateClientDto } from 'src/core/application/client/dtos/CreateClientDto';
import { BarberShopId } from '../barberShop/value-objects/barberShopId';

export class Client {
  constructor(
    private _userId: UserId,
    private readonly _barberShopId: BarberShopId,
    private readonly _isActive: boolean,
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

  get isActive(): boolean {
    return this._isActive;
  }

  update(
    fields: Partial<{
      userId: UserId;
      isActive: boolean;
    }>,
  ): Client {
    return new Client(
      fields.userId || this._userId,
      this._barberShopId,
      fields.isActive || this._isActive,
      this._id,
    );
  }

  static create(createClientDto: CreateClientDto): Client {
    return new Client(
      new UserId(createClientDto.userId),
      new BarberShopId(createClientDto.barberShopId),
      createClientDto.isActive,
    );
  }

  private validate(): void {
    if (!this._userId) {
      throw new ClientError('El ID del usuario no puede estar vacío.');
    }
  }
}
