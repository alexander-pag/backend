import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { UserId } from '../user/value-objects/userId';
import { BarberId } from './value-objects/barberId';
import { BarberSpecialty } from './value-objects/barberSpecialty';
import { CreateBarberDto } from 'src/core/application/barber/dtos/CreateBarberDto';
import { BarberShopId } from '../barberShop/value-objects/barberShopId';

export class Barber {
  constructor(
    private _user_id: UserId,
    private readonly _barberShopId: BarberShopId,
    private _specialty?: BarberSpecialty,
    private readonly _id?: BarberId,
  ) {
    this.validate();
  }

  get id(): BarberId | undefined {
    return this._id;
  }

  get userId(): UserId {
    return this._user_id;
  }

  get specialty(): BarberSpecialty {
    return this._specialty;
  }

  get barberShopId(): BarberShopId {
    return this._barberShopId;
  }

  update(
    fields: Partial<{
      userId: UserId;
      specialty: BarberSpecialty;
    }>,
  ) {
    return new Barber(
      fields.userId || this._user_id,
      this._barberShopId,
      fields.specialty || this._specialty,
      this._id,
    );
  }

  static create(createBarberDto: CreateBarberDto): Barber {
    return new Barber(
      new UserId(createBarberDto.userId),
      new BarberShopId(createBarberDto.barberShopId),
      createBarberDto.specialty
        ? new BarberSpecialty(createBarberDto.specialty)
        : undefined,
    );
  }

  private validate(): void {
    if (!this._user_id) {
      throw new DomainError('El ID del usuario no puede estar vacío.');
    }
  }
}
