import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../persistence/entities/UserEntity';
import { ClientEntity } from '../persistence/entities/ClientEntity';
import { BarberEntity } from '../persistence/entities/BarberEntity';
import { UserRepository } from '../persistence/repositories/UserRepository';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { ClientRepository } from '../persistence/repositories/ClientRepository';
import { ClientValidationService } from 'src/core/domain/client/service/ClientValidationService';
import { BarberRepository } from '../persistence/repositories/BarberRepository';
import { BarberValidationService } from 'src/core/domain/barber/service/BarberValidationService';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ClientEntity, BarberEntity])],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'UserService',
      useFactory: (userRepository: UserRepository) =>
        new UserValidationService(userRepository),
      inject: ['IUserRepository'],
    },
    {
      provide: 'IClientRepository',
      useClass: ClientRepository,
    },
    {
      provide: 'ClientService',
      useFactory: (clientRepository: ClientRepository) =>
        new ClientValidationService(clientRepository),
      inject: ['IClientRepository'],
    },
    {
      provide: 'IBarberRepository',
      useClass: BarberRepository,
    },
    {
      provide: 'BarberService',
      useFactory: (barberRepository: BarberRepository) =>
        new BarberValidationService(barberRepository),
      inject: ['IBarberRepository'],
    },
  ],
  controllers: [],
  exports: [
    'UserService',
    'ClientService',
    'BarberService',
    'IUserRepository',
    'IClientRepository',
    'IBarberRepository',
  ],
})
export class SharedModule {}
