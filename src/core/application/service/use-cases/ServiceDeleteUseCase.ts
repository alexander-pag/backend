import { IServiceRepository } from 'src/core/domain/service/repositories/IServiceRepository';
import { ServiceId } from 'src/core/domain/service/value-objects/serviceId';
import { ServiceNotFoundError } from '../exceptions/ServiceNotFoundError';
import { ServiceValidationService } from '../services/ServiceValidationService';

export class ServiceDeleteUseCase {
  constructor(
    private readonly serviceRepository: IServiceRepository,
    private readonly serviceService: ServiceValidationService,
  ) {}

  async execute(serviceId: string): Promise<void> {
    const serviceExists = await this.serviceService.exists(
      new ServiceId(serviceId),
    );

    if (!serviceExists) {
      throw new ServiceNotFoundError('El servicio no existe.');
    }

    await this.serviceRepository.delete(new ServiceId(serviceId));
  }
}
