import * as bcrypt from 'bcrypt';
import { IHashingService } from 'src/core/domain/user/repositories/IHashingRepository';

export class BcryptHashingService implements IHashingService {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 10) {
    this.saltRounds = saltRounds;
  }
  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
