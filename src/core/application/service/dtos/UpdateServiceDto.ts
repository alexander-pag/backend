export class UpdateServiceDto {
  constructor(
    public readonly name?: string,
    public readonly price?: number,
  ) {}
}
