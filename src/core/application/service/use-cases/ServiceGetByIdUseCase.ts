import { IServiceRepository } from 'src/core/domain/service/repositories/IServiceRepository';
import { Service } from 'src/core/domain/service/service.entity';
import { ServiceId } from 'src/core/domain/service/value-objects/serviceId';
import { ServiceNotFoundError } from '../exceptions/ServiceNotFoundError';

export class ServiceGetByIdUseCase {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(serviceId: string): Promise<Service> {
    const serviceExists = await this.serviceRepository.findById(
      new ServiceId(serviceId),
    );

    if (!serviceExists) {
      throw new ServiceNotFoundError('El servicio no existe.');
    }

    return serviceExists;
  }
}
