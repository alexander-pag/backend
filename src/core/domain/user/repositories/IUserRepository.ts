import { BarberShopId } from '../../barberShop/value-objects/barberShopId';
import { User } from '../user.entity';
import { UserEmail } from '../value-objects/userEmail';
import { UserId } from '../value-objects/userId';
import { UserPassword } from '../value-objects/userPassword';
import { UserPhone } from '../value-objects/userPhone';

export interface IUserRepository {
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  findByPhone(phone: UserPhone): Promise<User | null>;
  findAllByBarberShopId(barberShopId: BarberShopId): Promise<User[]>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<User>;
  resetPassword(id: UserId, password: UserPassword): Promise<void>;
  delete(id: UserId): Promise<void>;
}
