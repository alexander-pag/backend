import { IUserRepository } from 'src/core/domain/user/repositories/IUserRepository';
import { User } from 'src/core/domain/user/user.entity';
import { UserId } from 'src/core/domain/user/value-objects/userId';
import { UserNotFoundError } from '../exceptions/UserNotFoundError';

export class UserGetByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    const existingUser = await this.userRepository.findById(new UserId(id));

    if (!existingUser) {
      throw new UserNotFoundError('El cliente no existe.');
    }

    return existingUser;
  }
}
