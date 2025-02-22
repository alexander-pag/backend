import { Service } from 'src/core/domain/service/service.entity';
import { ServiceEntity } from '../entities/ServiceEntity';
import { ServiceName } from 'src/core/domain/service/value-objects/serviceName';
import { ServicePrice } from 'src/core/domain/service/value-objects/servicePrice';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { ServiceId } from 'src/core/domain/service/value-objects/serviceId';
import { ServiceIsActive } from 'src/core/domain/service/value-objects/serviceIsActive';
import { ServiceDuration } from 'src/core/domain/service/value-objects/serviceDuration';

export class ServiceMapper {
  static toEntity(service: Service): ServiceEntity {
    const serviceEntity = new ServiceEntity();

    serviceEntity.id = service.id?.value;
    serviceEntity.name = service.name.value;
    serviceEntity.price = service.price.value;

    serviceEntity.barberShopId = service.barberShopId.value;

    return serviceEntity;
  }

  static toDomain(serviceEntity: ServiceEntity): Service {
    return new Service(
      new ServiceName(serviceEntity.name),
      new BarberShopId(serviceEntity.barberShopId),
      new ServiceIsActive(serviceEntity.isActive),
      new ServiceDuration(serviceEntity.duration),
      new ServicePrice(serviceEntity.price),
      new ServiceId(serviceEntity.id),
    );
  }

  static toPlainObject(service: Service): any {
    return {
      id: service.id?.value,
      name: service.name.value,
      price: service.price.value,
      barberShopId: service.barberShopId.value,
      duration: service.duration.value,
      isActive: service.isActive.value,
    };
  }
}
