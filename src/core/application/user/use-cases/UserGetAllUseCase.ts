import { IUserRepository } from 'src/core/domain/user/repositories/IUserRepository';
import { UserDomain } from 'src/core/domain/user/user.entity';
import { UserMapper } from 'src/infrastructure/persistence/mappers/UserMapper';

export class UserGetAllUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<UserDomain[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => UserMapper.toPlainObject(user));
  }
}
