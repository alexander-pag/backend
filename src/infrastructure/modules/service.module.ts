import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from '../persistence/entities/ServiceEntity';
import { ServiceRepository } from '../persistence/repositories/ServiceRepository';
import { ServiceValidationService } from 'src/core/application/service/services/ServiceValidationService';
import { ServiceCreateUseCase } from 'src/core/application/service/use-cases/ServiceCreateUseCase';
import { ServiceUpdateUseCase } from 'src/core/application/service/use-cases/ServiceUpdateUseCase';
import { ServiceGetAllUseCase } from 'src/core/application/service/use-cases/ServiceGetAllUseCase';
import { ServiceGetByIdUseCase } from 'src/core/application/service/use-cases/ServiceGetByIdUseCase';
import { ServiceDeleteUseCase } from 'src/core/application/service/use-cases/ServiceDeleteUseCase';
import { ServiceController } from '../http/controllers/service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  providers: [
    {
      provide: 'IServiceRepository',
      useClass: ServiceRepository,
    },
    {
      provide: 'ServiceService',
      useFactory: (serviceRepository: ServiceRepository) =>
        new ServiceValidationService(serviceRepository),
      inject: ['IServiceRepository'],
    },
    {
      provide: 'ServiceUseCases',
      useFactory: (
        serviceRepository: ServiceRepository,
        serviceService: ServiceValidationService,
      ) => ({
        create: new ServiceCreateUseCase(serviceRepository),
        update: new ServiceUpdateUseCase(serviceRepository, serviceService),
        getAll: new ServiceGetAllUseCase(serviceRepository),
        getById: new ServiceGetByIdUseCase(serviceRepository),
        delete: new ServiceDeleteUseCase(serviceRepository, serviceService),
      }),
      inject: ['IServiceRepository', 'ServiceService'],
    },
  ],
  controllers: [ServiceController],
  exports: ['ServiceService'],
})
export class ServiceModule {}
