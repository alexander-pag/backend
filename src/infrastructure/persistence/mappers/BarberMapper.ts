import { BarberDomain } from 'src/core/domain/barber/barber.entity';
import { UserId } from 'src/core/domain/user/value-objects/userId';
import { BarberEntity } from '../entities/BarberEntity';
import { BarberSpecialty } from 'src/core/domain/barber/value-objects/barberSpecialty';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { BarberId } from 'src/core/domain/barber/value-objects/barberId';
import { BarberIsActive } from 'src/core/domain/barber/value-objects/barberIsActive';

export class BarberMapper {
  static toEntity(barber: BarberDomain): BarberEntity {
    const barberEntity = new BarberEntity();

    barberEntity.id = barber.id?.value;
    barberEntity.userId = barber.userId.value;
    barberEntity.barberShopId = barber.barberShopId.value;
    barberEntity.specialty = barber.specialty?.value;

    return barberEntity;
  }

  static toDomain(barberEntity: BarberEntity): BarberDomain {
    return new BarberDomain(
      new UserId(barberEntity.userId),
      new BarberShopId(barberEntity.barberShopId),
      new BarberIsActive(barberEntity.isActive),
      barberEntity.specialty
        ? new BarberSpecialty(barberEntity.specialty)
        : null,
      new BarberId(barberEntity.id),
    );
  }

  static toPlainObject(barber: BarberDomain): any {
    return {
      id: barber.id?.value,
      userId: barber.userId.value,
      barberShopId: barber.barberShopId.value,
      specialty: barber.specialty?.value,
      isActive: barber.isActive.value,
    };
  }
}
