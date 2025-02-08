import { BarberShop } from 'src/core/domain/barberShop/barberShop.entity';
import { BarberShopEntity } from '../entities/BarberShopEntity';
import { BarberShopName } from 'src/core/domain/barberShop/value-objects/barberShopName';
import { BarberShopSubscriptionStatus } from 'src/core/domain/barberShop/value-objects/barberShopSubscriptionStatus';
import { BarberShopPhone } from 'src/core/domain/barberShop/value-objects/barberShopPhone';
import { BarberShopEmail } from 'src/core/domain/barberShop/value-objects/barberShopEmail';
import { BarberShopAddress } from 'src/core/domain/barberShop/value-objects/barberShopAddress';
import { BarberShopNeighborhood } from 'src/core/domain/barberShop/value-objects/barberShopNeighborhood';
import { BarberShopCity } from 'src/core/domain/barberShop/value-objects/barberShopCity';
import { BarberShopState } from 'src/core/domain/barberShop/value-objects/barberShopState';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';

export class BarberShopMapper {
  static toEntity(barberShop: BarberShop): BarberShopEntity {
    const barberShopEntity = new BarberShopEntity();

    barberShopEntity.id = barberShop.id?.value;
    barberShopEntity.name = barberShop.name.value;
    barberShopEntity.subscriptionStatus = barberShop.subscriptionStatus.value;
    barberShopEntity.phone = barberShop.phone.value;
    barberShopEntity.email = barberShop.email.value;
    barberShopEntity.address = barberShop.address.value;
    barberShopEntity.neighborhood = barberShop.neighborhood.value;
    barberShopEntity.city = barberShop.city.value;
    barberShopEntity.state = barberShop.state.value;

    return barberShopEntity;
  }

  static toDomain(barberShopEntity: BarberShopEntity): BarberShop {
    return new BarberShop(
      new BarberShopName(barberShopEntity.name),
      new BarberShopPhone(barberShopEntity.phone),
      new BarberShopEmail(barberShopEntity.email),
      new BarberShopAddress(barberShopEntity.address),
      new BarberShopNeighborhood(barberShopEntity.neighborhood),
      new BarberShopCity(barberShopEntity.city),
      new BarberShopState(barberShopEntity.state),
      new BarberShopSubscriptionStatus(barberShopEntity.subscriptionStatus),
      new BarberShopId(barberShopEntity.id),
    );
  }

  static toPlainObject(barberShop: BarberShop): any {
    return {
      id: barberShop.id?.value,
      name: barberShop.name.value,
      subscriptionStatus: barberShop.subscriptionStatus.value,
      phone: barberShop.phone.value,
      email: barberShop.email.value,
      address: barberShop.address.value,
      neighborhood: barberShop.neighborhood.value,
      city: barberShop.city.value,
      state: barberShop.state.value,
    };
  }
}
