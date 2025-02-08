export class UpdateBarberDto {
  constructor(
    public readonly userId?: string,
    public readonly specialty?: string,
  ) {}
}
