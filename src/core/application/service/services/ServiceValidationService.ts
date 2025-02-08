import { IServiceRepository } from 'src/core/domain/service/repositories/IServiceRepository';
import { ServiceId } from 'src/core/domain/service/value-objects/serviceId';

export class ServiceValidationService {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async exists(serviceId: ServiceId): Promise<boolean> {
    const service = await this.serviceRepository.findById(serviceId);
    return !!service;
  }
}
