import { Module } from '@nestjs/common';
import { ClientCreateUseCase } from 'src/core/application/client/use-cases/ClientCreateUseCase';
import { ClientGetAllUseCase } from 'src/core/application/client/use-cases/ClientGetAllUseCase';
import { ClientGetByIdUseCase } from 'src/core/application/client/use-cases/ClientGetByIdUseCase';
import { ClientUpdateUseCase } from 'src/core/application/client/use-cases/ClientUpdateUseCase';
import { ClientRepository } from 'src/infrastructure/persistence/repositories/ClientRepository';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { ClientValidationService } from 'src/core/domain/client/service/ClientValidationService';
import { ClientDeleteUseCase } from 'src/core/application/client/use-cases/ClientDeleteUseCase';
import { ClientController } from '../http/controllers/client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from '../persistence/entities/ClientEntity';
import { SharedModule } from './shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]), SharedModule],

  providers: [
    {
      provide: 'ClientUseCases',
      useFactory: (
        clientRepository: ClientRepository,
        clientService: ClientValidationService,
        userService: UserValidationService,
      ) => ({
        create: new ClientCreateUseCase(clientRepository),
        update: new ClientUpdateUseCase(
          clientRepository,
          clientService,
          userService,
        ),
        getAll: new ClientGetAllUseCase(clientRepository),
        getById: new ClientGetByIdUseCase(clientRepository),
        delete: new ClientDeleteUseCase(clientRepository, clientService),
      }),
      inject: ['IClientRepository', 'ClientService', 'UserService'],
    },
  ],
  controllers: [ClientController],
  exports: [],
})
export class ClientModule {}
