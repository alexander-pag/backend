export interface IReportRepository {
  getDailyAppointments(): Promise<number>;
  getWeeklyAppointments(): Promise<number>;
  getMonthlyAppointments(): Promise<number>;

  getDailyCompletedAppointments(): Promise<number>;
  getDailyPendingAppointments(): Promise<number>;
  getDailyCancelledAppointments(): Promise<number>;

  getDailyRevenue(): Promise<number>;
  getWeeklyRevenue(): Promise<number>;
  getMonthlyRevenue(): Promise<number>;

  getDailyNewClients(): Promise<number>;
  getWeeklyNewClients(): Promise<number>;
  getMonthlyNewClients(): Promise<number>;

  getActiveBarbers(): Promise<number>;

  getDailyAppointmentsByService(): Promise<
    { service: string; count: number }[]
  >;
  getWeeklyAppointmentsByService(): Promise<
    { service: string; count: number }[]
  >;
  getMonthlyAppointmentsByService(): Promise<
    { service: string; count: number }[]
  >;

  getRevenueByService(): Promise<{ service: string; revenue: number }[]>;

  getDailyAppointmentsByBarber(): Promise<{ barber: string; count: number }[]>;
  getWeeklyAppointmentsByBarber(): Promise<{ barber: string; count: number }[]>;
  getMonthlyAppointmentsByBarber(): Promise<
    { barber: string; count: number }[]
  >;

  getDailyRevenueByBarber(): Promise<{ barber: string; revenue: number }[]>;
  getWeeklyRevenueByBarber(): Promise<{ barber: string; revenue: number }[]>;
  getMonthlyRevenueByBarber(): Promise<{ barber: string; revenue: number }[]>;

  getTotalAppointments(): Promise<number>;
  getTotalRevenue(): Promise<number>;
}
