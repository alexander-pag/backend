export class CreateBarberDto {
  constructor(
    public readonly userId: string,
    public readonly barberShopId: string,
    public readonly specialty?: string,
  ) {}
}
