import { IUserRepository } from 'src/core/domain/user/repositories/IUserRepository';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserEmail } from 'src/core/domain/user/value-objects/userEmail';
import { UserPhone } from 'src/core/domain/user/value-objects/userPhone';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { UserDomain } from 'src/core/domain/user/user.entity';
import { IHashingService } from 'src/core/domain/user/repositories/IHashingRepository';
import { UserPassword } from 'src/core/domain/user/value-objects/userPassword';
import { DomainEventDispatcher } from 'src/infrastructure/events/domain-event-dispatcher';
import { UserCreatedEvent } from 'src/core/domain/user/user-created.event';
import { Roles } from 'src/core/value-objects/user-role/roles';
import { BarberShopValidationService } from 'src/core/domain/barberShop/service/BarberShopValidationService';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';

export class UserRegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userService: UserValidationService,
    private readonly barberShopService: BarberShopValidationService,
    private readonly hashingService: IHashingService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<void> {
    await this.userService.isEmailUnique(new UserEmail(createUserDto.email));

    await this.userService.isPhoneUnique(new UserPhone(createUserDto.phone));

    await this.barberShopService.exists(
      new BarberShopId(createUserDto.barberShopId),
    );

    const user = UserDomain.create(createUserDto);

    const hashedPassword = await this.hashingService.encryptPassword(
      createUserDto.password,
    );

    user.updatePassword(new UserPassword(hashedPassword, true));

    const createdUser = await this.userRepository.save(user);

    DomainEventDispatcher.dispatch(
      new UserCreatedEvent(
        createdUser.id.value,
        createdUser.barberShopId.value,
        Roles.CLIENT,
      ),
    );
  }
}
