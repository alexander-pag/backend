import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IBarberRepository } from 'src/core/domain/barber/repositories/IBarberRepository';
import { BarberEntity } from '../entities/BarberEntity';
import { BarberId } from 'src/core/domain/barber/value-objects/barberId';
import { Barber } from 'src/core/domain/barber/barber.entity';
import { BarberMapper } from '../mappers/BarberMapper';

@Injectable()
export class BarberRepository implements IBarberRepository {
  constructor(
    @InjectRepository(BarberEntity)
    private readonly barberRepository: Repository<BarberEntity>,
  ) {}

  async findById(id: BarberId): Promise<Barber | null> {
    const barberEntity = await this.barberRepository.findOne({
      where: { id: id.value },
    });

    if (!barberEntity) {
      return null;
    }

    return BarberMapper.toDomain(barberEntity);
  }

  async findAll(): Promise<Barber[]> {
    const barberEntities = await this.barberRepository.find();

    return barberEntities.map((barberEntity) =>
      BarberMapper.toDomain(barberEntity),
    );
  }

  async save(barber: Barber): Promise<void> {
    const barberEntity = BarberMapper.toEntity(barber);
    await this.barberRepository.save(barberEntity);
  }

  async delete(id: BarberId): Promise<void> {
    await this.barberRepository.delete({
      id: id.value,
    });
  }
}
