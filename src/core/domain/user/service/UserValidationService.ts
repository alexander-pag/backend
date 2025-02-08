import { IUserRepository } from '../repositories/IUserRepository';
import { User } from '../user.entity';
import { UserEmail } from '../value-objects/userEmail';
import { UserId } from '../value-objects/userId';
import { UserPhone } from '../value-objects/userPhone';

export class UserValidationService {
  constructor(private readonly userRepository: IUserRepository) {}

  async exists(userId: UserId): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    return !!user;
  }

  async isEmailUnique(email: UserEmail): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);

    return !!user;
  }

  async isPhoneUnique(phone: UserPhone): Promise<boolean> {
    const user = await this.userRepository.findByPhone(phone);
    return !!user;
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
