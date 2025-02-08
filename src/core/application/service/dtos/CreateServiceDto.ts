export class CreateServiceDto {
  constructor(
    public readonly name: string,
    public readonly barberShopId: string,
    public readonly price: number,
    public readonly duration: number,
    public readonly isActive: boolean,
  ) {}
}
