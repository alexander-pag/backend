import { ServiceName } from './value-objects/serviceName';
import { BarberShopId } from '../barberShop/value-objects/barberShopId';
import { ServicePrice } from './value-objects/servicePrice';
import { ServiceError } from './exceptions/ServiceError';
import { ServiceId } from './value-objects/serviceId';
import { CreateServiceDto } from 'src/core/application/service/dtos/CreateServiceDto';
import { ServiceIsActive } from './value-objects/serviceIsActive';
import { ServiceDuration } from './value-objects/serviceDuration';

export class Service {
  constructor(
    private _name: ServiceName,
    private readonly _barberShopId: BarberShopId,
    private readonly _isActive: ServiceIsActive,
    private readonly _duration: ServiceDuration,
    private _price: ServicePrice,
    private readonly _id?: ServiceId,
  ) {
    this.validate();
  }

  get id(): ServiceId | undefined {
    return this._id;
  }

  get name(): ServiceName {
    return this._name;
  }

  get isActive(): ServiceIsActive {
    return this._isActive;
  }

  get duration(): ServiceDuration {
    return this._duration;
  }

  get barberShopId(): BarberShopId {
    return this._barberShopId;
  }

  get price(): ServicePrice {
    return this._price;
  }

  update(
    fields: Partial<{
      name: ServiceName;
      price: ServicePrice;
      duration: ServiceDuration;
      isActive: ServiceIsActive;
    }>,
  ): Service {
    return new Service(
      fields.name || this._name,
      this._barberShopId,
      fields.isActive || this._isActive,
      fields.duration || this._duration,
      fields.price || this._price,
      this._id,
    );
  }

  static create(createServiceDto: CreateServiceDto): Service {
    return new Service(
      new ServiceName(createServiceDto.name),
      new BarberShopId(createServiceDto.barberShopId),
      new ServiceIsActive(true),
      new ServiceDuration(createServiceDto.duration),
      new ServicePrice(createServiceDto.price),
    );
  }

  private validate() {
    if (!this._name) {
      throw new ServiceError('El nombre del servicio no puede estar vacío.');
    }
    if (!this._barberShopId) {
      throw new ServiceError('El ID de la barbería no puede estar vacío.');
    }
    if (!this._price) {
      throw new ServiceError('El precio del servicio no puede estar vacío.');
    }
  }
}
