import { IUserRepository } from 'src/core/domain/user/repositories/IUserRepository';
import { UserId } from 'src/core/domain/user/value-objects/userId';
import { UserNotFoundError } from '../exceptions/UserNotFoundError';
import { UserPassword } from 'src/core/domain/user/value-objects/userPassword';

export class UserResetPasswordUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string, password: string): Promise<void> {
    const user = await this.userRepository.findById(new UserId(id));

    if (!user) {
      throw new UserNotFoundError('El usuario no existe.');
    }

    const passwordVO = new UserPassword(password);
    await this.userRepository.resetPassword(user.id, passwordVO);
  }
}
