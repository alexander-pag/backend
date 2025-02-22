import { IHashingService } from 'src/core/domain/user/repositories/IHashingRepository';
import { IUserRepository } from 'src/core/domain/user/repositories/IUserRepository';
import { UserEmail } from 'src/core/domain/user/value-objects/userEmail';
import { UserInvalidCredentialsError } from '../exceptions/UserInvalidCredentialsError';

export class UserLoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashingService: IHashingService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(new UserEmail(email));

    if (!user) {
      throw new UserInvalidCredentialsError('Credenciales inválidas.');
    }

    const isPasswordValid = await this.hashingService.validatePassword(
      password,
      user.password.value,
    );

    if (!isPasswordValid) {
      throw new UserInvalidCredentialsError('Credenciales inválidas.');
    }

    return user;
  }
}
