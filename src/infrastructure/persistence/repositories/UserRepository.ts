import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from 'src/core/domain/user/repositories/IUserRepository';
import { UserEntity } from '../entities/UserEntity';
import { UserId } from 'src/core/domain/user/value-objects/userId';
import { UserDomain } from 'src/core/domain/user/user.entity';
import { UserMapper } from '../mappers/UserMapper';
import { UserEmail } from 'src/core/domain/user/value-objects/userEmail';
import { UserPhone } from 'src/core/domain/user/value-objects/userPhone';
import { UserPassword } from 'src/core/domain/user/value-objects/userPassword';
import { BarberShopId } from 'src/core/domain/barberShop/value-objects/barberShopId';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findById(id: UserId): Promise<UserDomain | null> {
    const userEntity = await this.userRepository.findOne({
      where: { id: id.value },
    });

    if (!userEntity) {
      return null;
    }

    const userDomain = UserMapper.toDomain(userEntity, true);

    return userDomain;
  }

  async resetPassword(id: UserId, password: UserPassword): Promise<void> {
    const userEntity = await this.userRepository.findOne({
      where: { id: id.value },
    });

    if (!userEntity) {
      return;
    }

    userEntity.password = password.value;
    await this.userRepository.save(userEntity);
  }

  async findByEmail(email: UserEmail): Promise<UserDomain | null> {
    const userEntity = await this.userRepository.findOne({
      where: { email: email.value },
    });

    if (!userEntity) {
      return null;
    }

    return UserMapper.toDomain(userEntity, true);
  }

  async findByPhone(phone: UserPhone): Promise<UserDomain | null> {
    const userEntity = await this.userRepository.findOne({
      where: { phone: phone.value },
    });

    if (!userEntity) {
      return null;
    }

    return UserMapper.toPlainObject(UserMapper.toDomain(userEntity));
  }

  async findAll(): Promise<UserDomain[]> {
    const userEntities = await this.userRepository.find();

    return userEntities.map((userEntity) =>
      UserMapper.toDomain(userEntity, true),
    );
  }

  async save(user: UserDomain): Promise<UserDomain> {
    const userEntity = UserMapper.toEntity(user);
    const userSaved = await this.userRepository.save(userEntity);
    return UserMapper.toDomain(userSaved, true);
  }

  async delete(id: UserId): Promise<void> {
    await this.userRepository.delete({
      id: id.value,
    });
  }

  async findAllByBarberShopId(
    barberShopId: BarberShopId,
  ): Promise<UserDomain[]> {
    const userEntities = await this.userRepository.find({
      where: { barberShopId: barberShopId.value },
    });

    return userEntities.map((userEntity) =>
      UserMapper.toDomain(userEntity, true),
    );
  }
}
