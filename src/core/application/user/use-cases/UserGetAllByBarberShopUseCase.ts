import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { IUserRepository } from 'src/core/domain/user/repositories/IUserRepository';
import { User } from 'src/core/domain/user/user.entity';
import { UserMapper } from 'src/infrastructure/persistence/mappers/UserMapper';

export class UserGetAllByBarberShopUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(barberShopId: string): Promise<User[]> {
    const users = await this.userRepository.findAllByBarberShopId(
      new BarberShopId(barberShopId),
    );

    return users.map((user) => UserMapper.toPlainObject(user));
  }
}
