import { Module } from '@nestjs/common';
import { BarberRepository } from 'src/infrastructure/persistence/repositories/BarberRepository';
import { BarberCreateUseCase } from 'src/core/application/barber/use-cases/BarberCreateUseCase';
import { BarberUpdateUseCase } from 'src/core/application/barber/use-cases/BarberUpdateUseCase';
import { BarberGetAllUseCase } from 'src/core/application/barber/use-cases/BarberGetAllUseCase';
import { BarberGetByIdUseCase } from 'src/core/application/barber/use-cases/BarberGetByIdUseCase';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { BarberValidationService } from 'src/core/domain/barber/service/BarberValidationService';
import { BarberDeleteUseCase } from 'src/core/application/barber/use-cases/BarberDeleteUseCase';
import { BarberController } from '../http/controllers/barber.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarberEntity } from '../persistence/entities/BarberEntity';
import { SharedModule } from './shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([BarberEntity]), SharedModule],
  providers: [
    {
      provide: 'BarberUseCases',
      useFactory: (
        barberRepository: BarberRepository,
        userService: UserValidationService,
        barberService: BarberValidationService,
      ) => ({
        create: new BarberCreateUseCase(barberRepository),
        update: new BarberUpdateUseCase(
          barberRepository,
          barberService,
          userService,
        ),
        getAll: new BarberGetAllUseCase(barberRepository),
        getById: new BarberGetByIdUseCase(barberRepository),
        delete: new BarberDeleteUseCase(barberRepository, barberService),
      }),
      inject: ['IBarberRepository', 'BarberService', 'UserService'],
    },
  ],
  controllers: [BarberController],
  exports: [],
})
export class BarberModule {}
