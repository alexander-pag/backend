import { Status } from 'src/core/value-objects/appointment/status';

export class CreateAppointmentDto {
  constructor(
    public readonly clientId: string,
    public readonly barberId: string,
    public readonly serviceId: string,
    public readonly date: string,
    public readonly barbershopId: string,
    public readonly state?: Status,
    public readonly id?: string,
  ) {}
}
