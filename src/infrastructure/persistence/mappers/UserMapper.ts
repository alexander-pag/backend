import { UserDomain } from 'src/core/domain/user/user.entity';
import { UserEntity } from '../entities/UserEntity';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';
import { UserName } from 'src/core/domain/user/value-objects/userName';
import { UserEmail } from 'src/core/domain/user/value-objects/userEmail';
import { UserPassword } from 'src/core/domain/user/value-objects/userPassword';
import { UserPhone } from 'src/core/domain/user/value-objects/userPhone';
import { UserRole } from 'src/core/domain/user/value-objects/userRole';
import { UserId } from 'src/core/domain/user/value-objects/userId';
import { UserIsActive } from 'src/core/domain/user/value-objects/userIsActive';

export class UserMapper {
  static toEntity(user: UserDomain): UserEntity {
    const userEntity = new UserEntity();

    userEntity.id = user.id?.value;
    userEntity.email = user.email.value;
    userEntity.password = user.password.value;
    userEntity.role = user.role?.value;
    userEntity.name = user.name.value;
    userEntity.phone = user.phone.value;
    userEntity.barberShopId = user.barberShopId.value;

    return userEntity;
  }

  static toDomain(
    userEntity: UserEntity,
    passwordIsHashed = false,
  ): UserDomain {
    return new UserDomain(
      new BarberShopId(userEntity.barberShopId),
      new UserName(userEntity.name),
      new UserEmail(userEntity.email),
      new UserPassword(userEntity.password, passwordIsHashed),
      new UserPhone(userEntity.phone),
      new UserIsActive(userEntity.isActive),
      new UserRole(userEntity.role),
      new UserId(userEntity.id),
    );
  }

  static toPlainObject(user: UserDomain): any {
    return {
      id: user.id?.value,
      email: user.email.value,
      role: user.role?.value,
      name: user.name.value,
      phone: user.phone.value,
      barberShopId: user.barberShopId.value,
      isActive: user.isActive.value,
    };
  }
}
