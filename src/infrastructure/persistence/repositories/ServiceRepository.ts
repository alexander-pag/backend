import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IServiceRepository } from 'src/core/domain/service/repositories/IServiceRepository';
import { ServiceEntity } from '../entities/ServiceEntity';
import { ServiceId } from 'src/core/domain/service/value-objects/serviceId';
import { Service } from 'src/core/domain/service/service.entity';
import { ServiceMapper } from '../mappers/ServiceMapper';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';

@Injectable()
export class ServiceRepository implements IServiceRepository {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  async findById(id: ServiceId): Promise<Service | null> {
    const serviceEntity = await this.serviceRepository.findOne({
      where: { id: id.value },
    });

    if (!serviceEntity) {
      return null;
    }

    return ServiceMapper.toDomain(serviceEntity);
  }

  async findAll(): Promise<Service[]> {
    const serviceEntities = await this.serviceRepository.find();

    return serviceEntities.map((userEntity) =>
      ServiceMapper.toPlainObject(ServiceMapper.toDomain(userEntity)),
    );
  }

  async save(service: Service): Promise<void> {
    const serviceEntity = ServiceMapper.toEntity(service);
    await this.serviceRepository.save(serviceEntity);
  }

  async delete(id: ServiceId): Promise<void> {
    await this.serviceRepository.delete({
      id: id.value,
    });
  }

  async findAllByBarberShopId(barberId: BarberShopId): Promise<Service[]> {
    const serviceEntities = await this.serviceRepository.find({
      where: { barberShopId: barberId.value },
    });

    return serviceEntities.map((serviceEntity) =>
      ServiceMapper.toPlainObject(ServiceMapper.toDomain(serviceEntity)),
    );
  }
}
