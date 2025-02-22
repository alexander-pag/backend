import { BarberShopId } from '../../barberShop/value-objects/barberShopId';
import { UserDomain } from '../user.entity';
import { UserEmail } from '../value-objects/userEmail';
import { UserId } from '../value-objects/userId';
import { UserPassword } from '../value-objects/userPassword';
import { UserPhone } from '../value-objects/userPhone';

export interface IUserRepository {
  findById(id: UserId): Promise<UserDomain | null>;
  findByEmail(email: UserEmail): Promise<UserDomain | null>;
  findByPhone(phone: UserPhone): Promise<UserDomain | null>;
  findAllByBarberShopId(barberShopId: BarberShopId): Promise<UserDomain[]>;
  findAll(): Promise<UserDomain[]>;
  save(user: UserDomain): Promise<UserDomain>;
  resetPassword(id: UserId, password: UserPassword): Promise<void>;
  delete(id: UserId): Promise<void>;
}
