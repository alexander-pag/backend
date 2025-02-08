import { Status } from 'src/core/value-objects/appointment/status';

export class UpdateAppointmentDto {
  constructor(
    public readonly clientId?: string,
    public readonly barberId?: string,
    public readonly serviceId?: string,
    public readonly date?: string,
    public readonly state?: Status,
  ) {}
}
