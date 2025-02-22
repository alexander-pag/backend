import { CreateUserDto } from 'src/core/application/user/dtos/CreateUserDto';
import { BarberShopId } from '../barberShop/value-objects/barberShopId';
import { UserEmail } from './value-objects/userEmail';
import { UserId } from './value-objects/userId';
import { UserName } from './value-objects/userName';
import { UserPassword } from './value-objects/userPassword';
import { UserPhone } from './value-objects/userPhone';
import { UserRole } from './value-objects/userRole';
import { Roles } from 'src/core/value-objects/user-role/roles';
import { UserIsActive } from './value-objects/userIsActive';
import { DomainError } from 'src/core/exceptions/domain/DomainError';

export class UserDomain {
  constructor(
    private readonly _barberShopId: BarberShopId,
    private _name: UserName,
    private _email: UserEmail,
    private _password: UserPassword,
    private _phone: UserPhone,
    private _isActive?: UserIsActive,
    private _role?: UserRole,
    private readonly _id?: UserId,
  ) {
    this.validate();
  }

  get id(): UserId | undefined {
    return this._id;
  }

  get barberShopId(): BarberShopId {
    return this._barberShopId;
  }

  get name(): UserName {
    return this._name;
  }

  get email(): UserEmail {
    return this._email;
  }

  get password(): UserPassword {
    return this._password;
  }

  get phone(): UserPhone {
    return this._phone;
  }

  get role(): UserRole | undefined {
    return this._role;
  }

  get isActive(): UserIsActive {
    return this._isActive;
  }

  update(
    fields: Partial<{
      name: UserName;
      email: UserEmail;
      password: UserPassword;
      phone: UserPhone;
      isActive: UserIsActive;
      role: UserRole;
    }>,
  ): UserDomain {
    return new UserDomain(
      this._barberShopId,
      fields.name || this._name,
      fields.email || this._email,
      fields.password || this._password,
      fields.phone || this._phone,
      fields.isActive || this._isActive,
      fields.role || this._role,
      this._id,
    );
  }

  static create(
    createUserDto: CreateUserDto,
    role: Roles = Roles.CLIENT,
  ): UserDomain {
    return new UserDomain(
      new BarberShopId(createUserDto.barberShopId),
      new UserName(createUserDto.name),
      new UserEmail(createUserDto.email),
      new UserPassword(createUserDto.password),
      new UserPhone(createUserDto.phone),
      new UserIsActive(true),
      new UserRole(role),
    );
  }

  updatePassword(newPassword: UserPassword): void {
    this._password = newPassword;
  }

  private validate(): void {
    if (!this._barberShopId) {
      throw new DomainError('El ID de la barbería no puede estar vacío.');
    }
    if (!this._name) {
      throw new DomainError('El nombre del usuario no puede estar vacío.');
    }
    if (!this._email) {
      throw new DomainError('El email del usuario no puede estar vacío.');
    }
    if (!this._password) {
      throw new DomainError('La contraseña del usuario no puede estar vacía.');
    }
    if (!this._phone) {
      throw new DomainError('El teléfono del usuario no puede estar vacío.');
    }
  }
}
