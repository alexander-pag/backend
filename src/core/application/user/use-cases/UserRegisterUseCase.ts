import { IUserRepository } from 'src/core/domain/user/repositories/IUserRepository';
import { CreateUserDto } from '../dtos/CreateUserDto';
import { UserEmail } from 'src/core/domain/user/value-objects/userEmail';
import { UserPhone } from 'src/core/domain/user/value-objects/userPhone';
import { UserEmailAlreadyExistsError } from '../exceptions/UserEmailAlreadyExistsError';
import { UserPhoneAlreadyExistsError } from '../exceptions/UserPhoneAlreadyExistsError';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { User } from 'src/core/domain/user/user.entity';
import { IHashingService } from 'src/core/domain/user/repositories/IHashingRepository';
import { UserPassword } from 'src/core/domain/user/value-objects/userPassword';

export class UserRegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userService: UserValidationService,
    private readonly hashingService: IHashingService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<void> {
    const emailExists = await this.userService.isEmailUnique(
      new UserEmail(createUserDto.email),
    );

    if (emailExists) {
      throw new UserEmailAlreadyExistsError(
        `El email ${createUserDto.email} ya se encuentra registrado.`,
      );
    }

    const phoneExists = await this.userService.isPhoneUnique(
      new UserPhone(createUserDto.phone),
    );

    if (phoneExists) {
      throw new UserPhoneAlreadyExistsError(
        `El teléfono ${createUserDto.phone} ya se encuentra registrado.`,
      );
    }

    const user = User.create(createUserDto);

    const hashedPassword = await this.hashingService.encryptPassword(
      createUserDto.password,
    );

    user.updatePassword(new UserPassword(hashedPassword, true));

    await this.userRepository.save(user);
  }
}
