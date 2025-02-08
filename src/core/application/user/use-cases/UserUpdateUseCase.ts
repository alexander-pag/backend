import { UserId } from 'src/core/domain/user/value-objects/userId';
import { UpdateUserDto } from '../dtos/UpdateUserDto';
import { IUserRepository } from 'src/core/domain/user/repositories/IUserRepository';
import { UserNotFoundError } from '../exceptions/UserNotFoundError';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { UserEmail } from 'src/core/domain/user/value-objects/userEmail';
import { UserName } from 'src/core/domain/user/value-objects/userName';
import { UserPassword } from 'src/core/domain/user/value-objects/userPassword';
import { UserPhone } from 'src/core/domain/user/value-objects/userPhone';

export class UserUpdateUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userService: UserValidationService,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const { barberShopId, email, name, password, phone, role } = updateUserDto;

    const existingUser = await this.userService.exists(new UserId(id));

    if (!existingUser) {
      throw new UserNotFoundError('El usuario no existe.');
    }

    if (email) {
      const existingEmail = await this.userService.isEmailUnique(
        new UserEmail(email),
      );

      if (existingEmail) {
        throw new UserNotFoundError('El email ya se encuentra registrado.');
      }
    }

    if (phone) {
      const existingPhone = await this.userService.isPhoneUnique(
        new UserPhone(phone),
      );

      if (existingPhone) {
        throw new UserNotFoundError('El teléfono ya se encuentra registrado.');
      }
    }

    const user = await this.userRepository.findById(new UserId(id));

    const updatedUser = user.update({
      barberShopId: barberShopId ? new BarberShopId(barberShopId) : undefined,
      email: email ? new UserEmail(email) : undefined,
      name: name ? new UserName(name) : undefined,
      password: password ? new UserPassword(password) : undefined,
      phone: phone ? new UserPhone(phone) : undefined,
      role: role ? role : undefined,
    });

    await this.userRepository.save(updatedUser);
  }
}
