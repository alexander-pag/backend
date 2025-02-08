import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRegisterUseCase } from 'src/core/application/user/use-cases/UserRegisterUseCase';
import { UserGetAllUseCase } from 'src/core/application/user/use-cases/UserGetAllUseCase';
import { UserGetByIdUseCase } from 'src/core/application/user/use-cases/UserGetByIdUseCase';
import { UserUpdateUseCase } from 'src/core/application/user/use-cases/UserUpdateUseCase';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { UserEntity } from 'src/infrastructure/persistence/entities/UserEntity';
import { UserRepository } from 'src/infrastructure/persistence/repositories/UserRepository';
import { UserController } from '../http/controllers/user.controller';
import { UserResetPasswordUseCase } from 'src/core/application/user/use-cases/UserResetPasswordUseCase';
import { BcryptHashingService } from '../services/BcryptHashingService';
import { UserLoginUseCase } from 'src/core/application/user/use-cases/UserLoginUseCase';
import { UserCreateUserUseCase } from 'src/core/application/user/use-cases/UserCreateUserUseCase';
import { ClientValidationService } from 'src/core/domain/client/service/ClientValidationService';
import { BarberValidationService } from 'src/core/domain/barber/service/BarberValidationService';
import { SharedModule } from './shared.module';
import { UserGetAllByBarberShopUseCase } from 'src/core/application/user/use-cases/UserGetAllByBarberShopUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedModule],
  providers: [
    {
      provide: 'BcryptHashingService',
      useClass: BcryptHashingService,
    },
    {
      provide: UserRegisterUseCase,
      useFactory: (
        userRepository: UserRepository,
        userService: UserValidationService,
        bcryptHashingService: BcryptHashingService,
      ) =>
        new UserRegisterUseCase(
          userRepository,
          userService,
          bcryptHashingService,
        ),
      inject: ['IUserRepository', 'UserService', 'BcryptHashingService'],
    },
    {
      provide: UserLoginUseCase,
      useFactory: (
        userRepository: UserRepository,
        bcryptHashingService: BcryptHashingService,
      ) => new UserLoginUseCase(userRepository, bcryptHashingService),
      inject: ['IUserRepository', 'BcryptHashingService'],
    },
    {
      provide: 'UserUseCases',
      useFactory: (
        userRepository: UserRepository,
        userService: UserValidationService,
        clientService: ClientValidationService,
        barberService: BarberValidationService,
      ) => ({
        update: new UserUpdateUseCase(userRepository, userService),
        getAll: new UserGetAllUseCase(userRepository),
        getAllByBarberShop: new UserGetAllByBarberShopUseCase(userRepository),
        getById: new UserGetByIdUseCase(userRepository),
        create: new UserCreateUserUseCase(
          userService,
          clientService,
          barberService,
        ),
        resetPassword: new UserResetPasswordUseCase(userRepository),
      }),
      inject: [
        'IUserRepository',
        'UserService',
        'ClientService',
        'BarberService',
      ],
    },
  ],
  controllers: [UserController],
  exports: [UserLoginUseCase, UserRegisterUseCase],
})
export class UserModule {}
