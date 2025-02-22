export class ReportDto {
  constructor(
    public readonly totalAppointments: number,
    public readonly totalRevenue: number,
    public readonly newClients: number,
    public readonly appointmentsByBarber: { barber: string; count: number }[],
    public readonly revenueByBarber: { barber: string; revenue: number }[],
  ) {}
}
