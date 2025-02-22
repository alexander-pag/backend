import { Injectable } from '@nestjs/common';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IReportRepository } from 'src/core/domain/reports/repositories/IReportRepository';
import { AppointmentEntity } from '../entities/AppointmentEntity';
import { ClientEntity } from '../entities/ClientEntity';
import { BarberEntity } from '../entities/BarberEntity';
import { Status } from 'src/core/value-objects/appointment/status';

@Injectable()
export class TypeOrmReportRepository implements IReportRepository {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(BarberEntity)
    private readonly barberRepository: Repository<BarberEntity>,
  ) {}

  async getDailyCompletedAppointments(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.appointmentRepository.count({
      where: {
        date: Between(today, new Date(today.getTime() + 24 * 60 * 60 * 1000)),
        state: Status.COMPLETED,
      },
    });
  }

  async getDailyPendingAppointments(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.appointmentRepository.count({
      where: {
        date: Between(today, new Date(today.getTime() + 24 * 60 * 60 * 1000)),
        state: Status.PENDING,
      },
    });
  }

  async getDailyCancelledAppointments(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.appointmentRepository.count({
      where: {
        date: Between(today, new Date(today.getTime() + 24 * 60 * 60 * 1000)),
        state: Status.CANCELLED,
      },
    });
  }

  async getDailyAppointments(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.appointmentRepository.count({
      where: {
        date: Between(today, new Date(today.getTime() + 24 * 60 * 60 * 1000)),
      },
    });
  }

  async getWeeklyAppointments(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.appointmentRepository.count({
      where: {
        date: Between(
          new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
          today,
        ),
      },
    });
  }

  async getMonthlyAppointments(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.appointmentRepository.count({
      where: {
        date: Between(
          new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
          today,
        ),
      },
    });
  }

  async getDailyRevenue(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('SUM(service.price)', 'total')
      .innerJoin('appointment.service', 'service')
      .where('appointment.date BETWEEN :start AND :end', {
        start: today,
        end: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      })
      .getRawOne();

    return result.total || 0;
  }

  async getWeeklyRevenue(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('SUM(service.price)', 'total')
      .innerJoin('appointment.service', 'service')
      .where('appointment.date BETWEEN :start AND :end', {
        start: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
        end: today,
      })
      .getRawOne();

    return result.total || 0;
  }

  async getMonthlyRevenue(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('SUM(service.price)', 'total')
      .innerJoin('appointment.service', 'service')
      .where('appointment.date BETWEEN :start AND :end', {
        start: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
        end: today,
      })
      .getRawOne();

    return result.total || 0;
  }

  async getDailyNewClients(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.clientRepository.count({
      where: {
        createdAt: Between(
          today,
          new Date(today.getTime() + 24 * 60 * 60 * 1000),
        ),
      },
    });
  }

  async getWeeklyNewClients(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.clientRepository.count({
      where: {
        createdAt: Between(
          new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
          today,
        ),
      },
    });
  }

  async getMonthlyNewClients(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.clientRepository.count({
      where: {
        createdAt: Between(
          new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
          today,
        ),
      },
    });
  }

  async getActiveBarbers(): Promise<number> {
    return this.barberRepository.count({
      where: {
        isActive: true,
      },
    });
  }

  async getAppointmentsByService(): Promise<
    { service: string; count: number }[]
  > {
    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('service.name', 'service')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('appointment.service', 'service')
      .groupBy('service.name')
      .getRawMany();
  }

  async getRevenueByService(): Promise<{ service: string; revenue: number }[]> {
    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('service.name', 'service')
      .addSelect('SUM(service.price)', 'revenue')
      .innerJoin('appointment.service', 'service')
      .groupBy('service.name')
      .getRawMany();
  }

  async getDailyAppointmentsByBarber(): Promise<
    { barber: string; count: number }[]
  > {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 del día actual

    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('user.name', 'barber')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('appointment.barber', 'barber')
      .innerJoin('barber.user', 'user')
      .where('appointment.date >= :startOfDay', { startOfDay: today })
      .andWhere('appointment.date < :endOfDay', {
        endOfDay: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Fin del día actual
      })
      .groupBy('user.name')
      .getRawMany();
  }

  async getWeeklyAppointmentsByBarber(): Promise<
    { barber: string; count: number }[]
  > {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Inicio de la semana (domingo)
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7); // Fin de la semana (sábado)
    endOfWeek.setHours(23, 59, 59, 999);

    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('user.name', 'barber')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('appointment.barber', 'barber')
      .innerJoin('barber.user', 'user')
      .where('appointment.date >= :startOfWeek', { startOfWeek })
      .andWhere('appointment.date <= :endOfWeek', { endOfWeek })
      .groupBy('user.name')
      .getRawMany();
  }

  async getMonthlyAppointmentsByBarber(): Promise<
    { barber: string; count: number }[]
  > {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Inicio del mes
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Fin del mes
    endOfMonth.setHours(23, 59, 59, 999);

    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('user.name', 'barber')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('appointment.barber', 'barber')
      .innerJoin('barber.user', 'user')
      .where('appointment.date >= :startOfMonth', { startOfMonth })
      .andWhere('appointment.date <= :endOfMonth', { endOfMonth })
      .groupBy('user.name')
      .getRawMany();
  }

  async getDailyRevenueByBarber(): Promise<
    { barber: string; revenue: number }[]
  > {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a las 00:00:00 del día actual

    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('user.name', 'barber') // Acceder al nombre a través de la relación con UserEntity
      .addSelect('SUM(service.price)', 'revenue')
      .innerJoin('appointment.barber', 'barber') // Unir con BarberEntity
      .innerJoin('barber.user', 'user') // Unir con UserEntity
      .innerJoin('appointment.service', 'service') // Unir con ServiceEntity
      .where('appointment.date >= :startOfDay', { startOfDay: today })
      .andWhere('appointment.date < :endOfDay', {
        endOfDay: new Date(today.getTime() + 24 * 60 * 60 * 1000), // Fin del día actual
      })
      .groupBy('user.name') // Agrupar por el nombre del usuario
      .getRawMany();
  }

  async getWeeklyRevenueByBarber(): Promise<
    { barber: string; revenue: number }[]
  > {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Inicio de la semana (domingo)
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7); // Fin de la semana (sábado)
    endOfWeek.setHours(23, 59, 59, 999);

    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('user.name', 'barber') // Acceder al nombre a través de la relación con UserEntity
      .addSelect('SUM(service.price)', 'revenue')
      .innerJoin('appointment.barber', 'barber') // Unir con BarberEntity
      .innerJoin('barber.user', 'user') // Unir con UserEntity
      .innerJoin('appointment.service', 'service') // Unir con ServiceEntity
      .where('appointment.date >= :startOfWeek', { startOfWeek })
      .andWhere('appointment.date <= :endOfWeek', { endOfWeek })
      .groupBy('user.name') // Agrupar por el nombre del usuario
      .getRawMany();
  }

  async getMonthlyRevenueByBarber(): Promise<
    { barber: string; revenue: number }[]
  > {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Inicio del mes
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Fin del mes
    endOfMonth.setHours(23, 59, 59, 999);

    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('user.name', 'barber') // Acceder al nombre a través de la relación con UserEntity
      .addSelect('SUM(service.price)', 'revenue')
      .innerJoin('appointment.barber', 'barber') // Unir con BarberEntity
      .innerJoin('barber.user', 'user') // Unir con UserEntity
      .innerJoin('appointment.service', 'service') // Unir con ServiceEntity
      .where('appointment.date >= :startOfMonth', { startOfMonth })
      .andWhere('appointment.date <= :endOfMonth', { endOfMonth })
      .groupBy('user.name') // Agrupar por el nombre del usuario
      .getRawMany();
  }

  async getTotalAppointments(): Promise<number> {
    return this.appointmentRepository.count();
  }

  async getTotalRevenue(): Promise<number> {
    const result = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('SUM(service.price)', 'total')
      .innerJoin('appointment.service', 'service')
      .getRawOne();

    return result.total || 0;
  }

  async getDailyAppointmentsByService(): Promise<
    { service: string; count: number }[]
  > {
    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('service.name', 'service')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('appointment.service', 'service')
      .groupBy('service.name')
      .getRawMany();
  }

  async getWeeklyAppointmentsByService(): Promise<
    { service: string; count: number }[]
  > {
    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('service.name', 'service')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('appointment.service', 'service')
      .groupBy('service.name')
      .getRawMany();
  }

  async getMonthlyAppointmentsByService(): Promise<
    { service: string; count: number }[]
  > {
    return this.appointmentRepository
      .createQueryBuilder('appointment')
      .select('service.name', 'service')
      .addSelect('COUNT(*)', 'count')
      .innerJoin('appointment.service', 'service')
      .groupBy('service.name')
      .getRawMany();
  }
}
