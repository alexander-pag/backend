import { IUserRepository } from 'src/core/domain/user/repositories/IUserRepository';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { UserId } from 'src/core/domain/user/value-objects/userId';
import { UserNotFoundError } from '../exceptions/UserNotFoundError';

export class UserDeleteUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userService: UserValidationService,
  ) {}

  async execute(userId: string): Promise<void> {
    const userExists = await this.userService.exists(new UserId(userId));

    if (!userExists) {
      throw new UserNotFoundError('El usuario no existe.');
    }

    await this.userRepository.delete(new UserId(userId));
  }
}
