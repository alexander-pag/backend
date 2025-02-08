import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBarberShopRepository } from 'src/core/domain/barberShop/repositories/IBarberShopRepository';
import { BarberShopEntity } from '../entities/BarberShopEntity';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { BarberShop } from 'src/core/domain/barberShop/barberShop.entity';
import { BarberShopMapper } from '../mappers/BarberShopMapper';
import { BarberShopEmail } from 'src/core/domain/barberShop/value-objects/barberShopEmail';
import { BarberShopPhone } from 'src/core/domain/barberShop/value-objects/barberShopPhone';

@Injectable()
export class BarberShopRepository implements IBarberShopRepository {
  constructor(
    @InjectRepository(BarberShopEntity)
    private readonly barberShopRepository: Repository<BarberShopEntity>,
  ) {}

  async findById(id: BarberShopId): Promise<BarberShop | null> {
    const barberShopEntity = await this.barberShopRepository.findOne({
      where: { id: id.value },
    });

    if (!barberShopEntity) {
      return null;
    }

    return BarberShopMapper.toDomain(barberShopEntity);
  }

  async findByEmail(email: BarberShopEmail): Promise<BarberShop | null> {
    const barberShopEntity = await this.barberShopRepository.findOne({
      where: { email: email.value },
    });

    if (!barberShopEntity) {
      return null;
    }

    return BarberShopMapper.toDomain(barberShopEntity);
  }

  async findByPhone(phone: BarberShopPhone): Promise<BarberShop | null> {
    const barberShopEntity = await this.barberShopRepository.findOne({
      where: { phone: phone.value },
    });

    if (!barberShopEntity) {
      return null;
    }

    return BarberShopMapper.toDomain(barberShopEntity);
  }

  async findAll(): Promise<BarberShop[]> {
    const barberShopEntities = await this.barberShopRepository.find();

    return barberShopEntities.map((barberShopEntity) =>
      BarberShopMapper.toPlainObject(
        BarberShopMapper.toDomain(barberShopEntity),
      ),
    );
  }

  async save(barberShop: BarberShop): Promise<BarberShop> {
    const barberShopEntity = BarberShopMapper.toEntity(barberShop);
    const barberShopSaved =
      await this.barberShopRepository.save(barberShopEntity);

    return BarberShopMapper.toDomain(barberShopSaved);
  }

  async delete(id: BarberShopId): Promise<void> {
    await this.barberShopRepository.delete({
      id: id.value,
    });
  }
}
