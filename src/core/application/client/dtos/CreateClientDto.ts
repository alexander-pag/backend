import { publicDecrypt } from 'crypto';

export class CreateClientDto {
  constructor(
    public readonly userId: string,
    public readonly barberShopId: string,
    public readonly isActive: boolean,
  ) {}
}
