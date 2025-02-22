export class CreateClientDto {
  constructor(
    public readonly userId: string,
    public readonly barberShopId: string,
  ) {}
}
