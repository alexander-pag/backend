import { UserRole } from 'src/core/domain/user/value-objects/userRole';
import { Roles } from 'src/core/value-objects/user-role/roles';

export class CreateUserInput {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly password: string,
    public readonly role: Roles,
    public readonly barberShopId: string,
  ) {}
}
