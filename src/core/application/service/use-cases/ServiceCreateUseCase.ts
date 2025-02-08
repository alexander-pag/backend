import { IServiceRepository } from 'src/core/domain/service/repositories/IServiceRepository';
import { CreateServiceDto } from '../dtos/CreateServiceDto';
import { Service } from 'src/core/domain/service/service.entity';

export class ServiceCreateUseCase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(createServiceDto: CreateServiceDto): Promise<void> {
    const service = Service.create(createServiceDto);

    await this.serviceRepository.save(service);
  }
}
