import { Barber } from 'src/core/domain/barber/barber.entity';
import { UserId } from 'src/core/domain/user/value-objects/userId';
import { BarberEntity } from '../entities/BarberEntity';
import { BarberSpecialty } from 'src/core/domain/barber/value-objects/barberSpecialty';

export class BarberMapper {
  static toEntity(barber: Barber): BarberEntity {
    const barberEntity = new BarberEntity();

    barberEntity.id = barber.id?.value;
    barberEntity.userId = barber.userId.value;
    barberEntity.specialty = barber.specialty?.value;

    return barberEntity;
  }

  static toDomain(barberEntity: BarberEntity): Barber {
    return new Barber(
      new UserId(barberEntity.userId),
      barberEntity.specialty
        ? new BarberSpecialty(barberEntity.specialty)
        : null,
    );
  }
}
