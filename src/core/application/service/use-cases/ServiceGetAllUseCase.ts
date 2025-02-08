import { IServiceRepository } from 'src/core/domain/service/repositories/IServiceRepository';
import { Service } from 'src/core/domain/service/service.entity';

export class ServiceGetAllUseCase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(): Promise<Service[]> {
    return this.serviceRepository.findAll();
  }
}
