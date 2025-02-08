import { BarberId } from '../barber/value-objects/barberId';
import { BarberShopId } from '../barberShop/value-objects/barberShopId';
import { ScheduleError } from './exceptions/ScheduleError';
import { ScheduleDayOfWeek } from './value-objects/scheduleDayOfWeek';
import { ScheduleId } from './value-objects/scheduleId';
import { ScheduleStartTime } from './value-objects/scheduleStartTime';

export class Schedule {
  constructor(
    private readonly _barberId: BarberId,
    private readonly _dayOfWeek: ScheduleDayOfWeek,
    private readonly _startTime: ScheduleStartTime,
    private readonly _endTime: ScheduleStartTime,
    private readonly _barberShopId: BarberShopId,
    private readonly _id?: ScheduleId,
  ) {
    this.validate();
  }

  get id(): ScheduleId {
    return this._id;
  }

  get barber_id(): BarberId {
    return this._barberId;
  }

  get barberShopId(): BarberShopId {
    return this._barberShopId;
  }

  get dayOfWeek(): ScheduleDayOfWeek {
    return this._dayOfWeek;
  }

  get startTime(): ScheduleStartTime {
    return this._startTime;
  }

  get endTime(): ScheduleStartTime {
    return this._endTime;
  }

  private validate(): void {
    if (!this._barberId) {
      throw new ScheduleError('El ID del barbero no puede estar vacío.');
    }
    if (!this._dayOfWeek) {
      throw new ScheduleError('El día de la semana no puede estar vacío.');
    }
    if (!this._startTime) {
      throw new ScheduleError('La hora de inicio no puede estar vacía.');
    }
    if (!this._endTime) {
      throw new ScheduleError('La hora de fin no puede estar vacía.');
    }
  }
}
