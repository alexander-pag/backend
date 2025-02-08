import { IServiceRepository } from 'src/core/domain/service/repositories/IServiceRepository';
import { ServiceValidationService } from '../services/ServiceValidationService';
import { UpdateServiceDto } from '../dtos/UpdateServiceDto';
import { ServiceId } from 'src/core/domain/service/value-objects/serviceId';
import { ServiceNotFoundError } from '../exceptions/ServiceNotFoundError';
import { ServiceName } from 'src/core/domain/service/value-objects/serviceName';
import { ServicePrice } from 'src/core/domain/service/value-objects/servicePrice';

export class ServiceUpdateUseCase {
  constructor(
    private readonly serviceRepository: IServiceRepository,
    private readonly serviceService: ServiceValidationService,
  ) {}

  async execute(
    serviceId: string,
    updateServiceDto: UpdateServiceDto,
  ): Promise<void> {
    const serviceExists = await this.serviceService.exists(
      new ServiceId(serviceId),
    );

    if (!serviceExists) {
      throw new ServiceNotFoundError('El servicio no existe.');
    }

    const service = await this.serviceRepository.findById(
      new ServiceId(serviceId),
    );

    const updatedService = service.update({
      name: new ServiceName(updateServiceDto.name),
      price: new ServicePrice(updateServiceDto.price),
    });

    await this.serviceRepository.save(updatedService);
  }
}
