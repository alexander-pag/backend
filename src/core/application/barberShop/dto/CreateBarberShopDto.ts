import { SubscriptionStatus } from 'src/core/value-objects/barberShop/subscriptionStatus';

export class CreateBarberShopDto {
  constructor(
    public readonly name: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly address: string,
    public readonly neighborhood: string,
    public readonly city: string,
    public readonly state: string,
    public readonly subscriptionStatus?: SubscriptionStatus,
  ) {}
}
