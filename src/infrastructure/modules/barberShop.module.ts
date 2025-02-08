import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberShopEntity } from '../persistence/entities/BarberShopEntity';
import { BarberShopRepository } from '../persistence/repositories/BarberShopRepository';
import { BarberShopValidationService } from 'src/core/domain/barberShop/service/BarberShopValidationService';
import { BarberShopCreateUseCase } from 'src/core/application/barberShop/use-cases/BarberShopCreateUseCase';
import { BarberShopUpdateUseCase } from 'src/core/application/barberShop/use-cases/BarberShopUpdateUseCase';
import { BarberShopGetAllUseCase } from 'src/core/application/barberShop/use-cases/BarberShopGetAllUseCase';
import { BarberShopGetByIdUseCase } from 'src/core/application/barberShop/use-cases/BarberShopGetByIdUseCase';
import { BarberShopDeleteUseCase } from 'src/core/application/barberShop/use-cases/BarberShopDeleteUseCase';
import { BarberShopController } from '../http/controllers/barberShop.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BarberShopEntity])],
  providers: [
    {
      provide: 'IBarberShopRepository',
      useClass: BarberShopRepository,
    },
    {
      provide: 'BarberShopService',
      useFactory: (barberShopRepository: BarberShopRepository) =>
        new BarberShopValidationService(barberShopRepository),
      inject: ['IBarberShopRepository'],
    },
    {
      provide: 'BarberShopUseCases',
      useFactory: (
        barberShopRepository: BarberShopRepository,
        barberShopService: BarberShopValidationService,
      ) => ({
        create: new BarberShopCreateUseCase(
          barberShopRepository,
          barberShopService,
        ),
        update: new BarberShopUpdateUseCase(
          barberShopRepository,
          barberShopService,
        ),
        getAll: new BarberShopGetAllUseCase(barberShopRepository),
        getById: new BarberShopGetByIdUseCase(barberShopRepository),
        delete: new BarberShopDeleteUseCase(barberShopRepository),
      }),
      inject: ['IBarberShopRepository', 'BarberShopService'],
    },
  ],
  controllers: [BarberShopController],
  exports: ['BarberShopService'],
})
export class BarberShopModule {}
