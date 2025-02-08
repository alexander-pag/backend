import { CreateUserDto } from 'src/core/application/user/dtos/CreateUserDto';
import { BarberShopId } from '../barberShop/value-objects/barberShopId';
import { UserError } from './exceptions/UserError';
import { UserEmail } from './value-objects/userEmail';
import { UserId } from './value-objects/userId';
import { UserName } from './value-objects/userName';
import { UserPassword } from './value-objects/userPassword';
import { UserPhone } from './value-objects/userPhone';
import { UserRole } from './value-objects/userRole';
import { Roles } from 'src/core/value-objects/user-role/roles';

export class User {
  constructor(
    private readonly _barberShopId: BarberShopId,
    private _name: UserName,
    private _email: UserEmail,
    private _password: UserPassword,
    private _phone: UserPhone,
    private _isActive: boolean,
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

  get isActive(): boolean {
    return this._isActive;
  }

  update(
    fields: Partial<{
      barberShopId: BarberShopId;
      name: UserName;
      email: UserEmail;
      password: UserPassword;
      phone: UserPhone;
      isActive: boolean;
      role: UserRole;
    }>,
  ): User {
    return new User(
      fields.barberShopId || this._barberShopId,
      fields.name || this._name,
      fields.email || this._email,
      fields.password || this._password,
      fields.phone || this._phone,
      fields.isActive || this._isActive,
      fields.role || this._role,
      this._id,
    );
  }

  static create(createUserDto: CreateUserDto): User {
    return new User(
      new BarberShopId(createUserDto.barberShopId),
      new UserName(createUserDto.name),
      new UserEmail(createUserDto.email),
      new UserPassword(createUserDto.password),
      new UserPhone(createUserDto.phone),
      createUserDto.isActive,
      createUserDto.role
        ? new UserRole(createUserDto.role)
        : new UserRole(Roles.CLIENT),
    );
  }

  updatePassword(newPassword: UserPassword): void {
    this._password = newPassword;
  }

  private validate(): void {
    if (!this._barberShopId) {
      throw new UserError('El ID de la barbería no puede estar vacío.');
    }
    if (!this._name) {
      throw new UserError('El nombre del usuario no puede estar vacío.');
    }
    if (!this._email) {
      throw new UserError('El email del usuario no puede estar vacío.');
    }
    if (!this._password) {
      throw new UserError('La contraseña del usuario no puede estar vacía.');
    }
    if (!this._phone) {
      throw new UserError('El teléfono del usuario no puede estar vacío.');
    }
  }
}
