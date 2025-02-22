import { Module } from '@nestjs/common';
import { UserRegisterUseCase } from 'src/core/application/user/use-cases/UserRegisterUseCase';
import { UserGetAllUseCase } from 'src/core/application/user/use-cases/UserGetAllUseCase';
import { UserGetByIdUseCase } from 'src/core/application/user/use-cases/UserGetByIdUseCase';
import { UserUpdateUseCase } from 'src/core/application/user/use-cases/UserUpdateUseCase';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { UserRepository } from 'src/infrastructure/persistence/repositories/UserRepository';
import { UserController } from '../http/controllers/user.controller';
import { UserResetPasswordUseCase } from 'src/core/application/user/use-cases/UserResetPasswordUseCase';
import { BcryptHashingService } from '../services/BcryptHashingService';
import { UserLoginUseCase } from 'src/core/application/user/use-cases/UserLoginUseCase';
import { UserCreateUserUseCase } from 'src/core/application/user/use-cases/UserCreateUserUseCase';
import { UserGetAllByBarberShopUseCase } from 'src/core/application/user/use-cases/UserGetAllByBarberShopUseCase';
import { UserCreateAdminUseCase } from 'src/core/application/user/use-cases/UserCreateAdminUseCase';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../persistence/entities/UserEntity';
import { SharedModule } from './shared.module';
import { BarberShopModule } from './barberShop.module';
import { BarberShopValidationService } from 'src/core/domain/barberShop/service/BarberShopValidationService';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    SharedModule,
    BarberShopModule,
  ],
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
        barberShopService: BarberShopValidationService,
        bcryptHashingService: BcryptHashingService,
      ) =>
        new UserRegisterUseCase(
          userRepository,
          userService,
          barberShopService,
          bcryptHashingService,
        ),
      inject: [
        'IUserRepository',
        'UserService',
        'BarberShopService',
        'BcryptHashingService',
      ],
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
        bcryptHashingService: BcryptHashingService,
      ) => ({
        update: new UserUpdateUseCase(userRepository, userService),
        getAll: new UserGetAllUseCase(userRepository),
        getAllByBarberShop: new UserGetAllByBarberShopUseCase(userRepository),
        getById: new UserGetByIdUseCase(userRepository),
        create: new UserCreateUserUseCase(
          userRepository,
          userService,
          bcryptHashingService,
        ),
        resetPassword: new UserResetPasswordUseCase(userRepository),
        createAdmin: new UserCreateAdminUseCase(
          userRepository,
          userService,
          bcryptHashingService,
        ),
      }),
      inject: ['IUserRepository', 'UserService', 'BcryptHashingService'],
    },
  ],
  controllers: [UserController],
  exports: [UserLoginUseCase, UserRegisterUseCase],
})
export class UserModule {}
