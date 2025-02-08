import { UserRole } from 'src/core/domain/user/value-objects/userRole';

export class UpdateUserDto {
  constructor(
    public readonly barberShopId?: string,
    public readonly name?: string,
    public readonly email?: string,
    public readonly password?: string,
    public readonly phone?: string,
    public readonly role?: UserRole,
  ) {}
}
