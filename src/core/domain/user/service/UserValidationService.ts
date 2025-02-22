import { DomainError } from 'src/core/exceptions/domain/DomainError';
import { IUserRepository } from '../repositories/IUserRepository';
import { UserEmail } from '../value-objects/userEmail';
import { UserId } from '../value-objects/userId';
import { UserPhone } from '../value-objects/userPhone';

export class UserValidationService {
  constructor(private readonly userRepository: IUserRepository) {}

  async exists(userId: UserId) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new DomainError('El usuario no existe');
    }

    return user;
  }

  async isEmailUnique(email: UserEmail) {
    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new DomainError('El usuario ya existe');
    }

    return user;
  }

  async isPhoneUnique(phone: UserPhone) {
    const user = await this.userRepository.findByPhone(phone);

    if (user) {
      throw new DomainError('El usuario ya existe');
    }

    return user;
  }
}
