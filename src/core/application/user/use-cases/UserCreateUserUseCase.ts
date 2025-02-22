import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { UserEmail } from 'src/core/domain/user/value-objects/userEmail';
import { UserDomain } from 'src/core/domain/user/user.entity';
import { UserEmailAlreadyExistsError } from '../exceptions/UserEmailAlreadyExistsError';
import { UserPhone } from 'src/core/domain/user/value-objects/userPhone';
import { UserPhoneAlreadyExistsError } from '../exceptions/UserPhoneAlreadyExistsError';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { DomainEventDispatcher } from 'src/infrastructure/events/domain-event-dispatcher';
import { UserCreatedEvent } from 'src/core/domain/user/user-created.event';
import { IUserRepository } from 'src/core/domain/user/repositories/IUserRepository';
import { IHashingService } from 'src/core/domain/user/repositories/IHashingRepository';
import { UserPassword } from 'src/core/domain/user/value-objects/userPassword';

export class UserCreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userService: UserValidationService,
    private readonly hashingService: IHashingService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<void> {
    const { email, role, phone } = createUserDto;

    const userEmailExists = await this.userService.isEmailUnique(
      new UserEmail(email),
    );
    if (userEmailExists) {
      throw new UserEmailAlreadyExistsError('El email ya existe.');
    }

    const userPhoneExists = await this.userService.isPhoneUnique(
      new UserPhone(phone),
    );
    if (userPhoneExists) {
      throw new UserPhoneAlreadyExistsError('El teléfono ya existe.');
    }

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
        role,
      ),
    );
  }
}
