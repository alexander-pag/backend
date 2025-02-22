import { CreateBarberShopDto } from 'src/core/application/barberShop/dto/CreateBarberShopDto';
import { BarberShopError } from './exceptions/BarberShopError';
import { BarberShopAddress } from './value-objects/barberShopAddress';
import { BarberShopCity } from './value-objects/barberShopCity';
import { BarberShopEmail } from './value-objects/barberShopEmail';
import { BarberShopId } from './value-objects/barberShopId';
import { BarberShopName } from './value-objects/barberShopName';
import { BarberShopNeighborhood } from './value-objects/barberShopNeighborhood';
import { BarberShopPhone } from './value-objects/barberShopPhone';
import { BarberShopState } from './value-objects/barberShopState';
import { BarberShopSubscriptionStatus } from './value-objects/barberShopSubscriptionStatus';
import { SubscriptionId } from '../subscription/value-objects/subscriptionId';

export class BarberShop {
  constructor(
    private _name: BarberShopName,
    private _phone: BarberShopPhone,
    private _email: BarberShopEmail,
    private _address: BarberShopAddress,
    private _neighborhood: BarberShopNeighborhood,
    private _city: BarberShopCity,
    private _state: BarberShopState,
    private _subscriptionId?: SubscriptionId,
    private _subscriptionStatus?: BarberShopSubscriptionStatus,
    private readonly _id?: BarberShopId,
  ) {
    this.validate();
  }

  get id(): BarberShopId | undefined {
    return this._id;
  }

  get name(): BarberShopName {
    return this._name;
  }

  get subscriptionStatus(): BarberShopSubscriptionStatus {
    return this._subscriptionStatus;
  }

  get phone(): BarberShopPhone {
    return this._phone;
  }

  get email(): BarberShopEmail {
    return this._email;
  }

  get address(): BarberShopAddress {
    return this._address;
  }

  get neighborhood(): BarberShopNeighborhood {
    return this._neighborhood;
  }

  get city(): BarberShopCity {
    return this._city;
  }

  get state(): BarberShopState {
    return this._state;
  }

  get subscriptionId(): SubscriptionId {
    return this._subscriptionId;
  }

  assignSubscription(subscriptionId: SubscriptionId): void {
    this._subscriptionId = subscriptionId;
  }

  update(
    fields: Partial<{
      name: BarberShopName;
      subscriptionStatus: BarberShopSubscriptionStatus;
      phone: BarberShopPhone;
      email: BarberShopEmail;
      address: BarberShopAddress;
      neighborhood: BarberShopNeighborhood;
      city: BarberShopCity;
      state: BarberShopState;
    }>,
  ): BarberShop {
    return new BarberShop(
      fields.name || this._name,
      fields.phone || this._phone,
      fields.email || this._email,
      fields.address || this._address,
      fields.neighborhood || this._neighborhood,
      fields.city || this._city,
      fields.state || this._state,
      this._subscriptionId,
      fields.subscriptionStatus || this._subscriptionStatus,
      this._id,
    );
  }

  static create(createBarberShopDto: CreateBarberShopDto): BarberShop {
    return new BarberShop(
      new BarberShopName(createBarberShopDto.name),
      new BarberShopPhone(createBarberShopDto.phone),
      new BarberShopEmail(createBarberShopDto.email),
      new BarberShopAddress(createBarberShopDto.address),
      new BarberShopNeighborhood(createBarberShopDto.neighborhood),
      new BarberShopCity(createBarberShopDto.city),
      new BarberShopState(createBarberShopDto.state),
    );
  }

  private validate(): void {
    if (
      !this._name ||
      !this._phone ||
      !this._email ||
      !this._address ||
      !this._neighborhood ||
      !this._city ||
      !this._state
    ) {
      throw new BarberShopError(
        'Todos los campos de la barbería son requeridos.',
      );
    }
  }
}
