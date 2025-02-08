import { Roles } from 'src/core/value-objects/user-role/roles';

export class CreateUserDto {
  constructor(
    public readonly barberShopId: string,
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly phone: string,
    public readonly isActive: boolean,
    public readonly role?: Roles,
  ) {}
}
