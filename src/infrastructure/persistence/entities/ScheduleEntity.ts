import { DayOfWeek } from 'src/core/value-objects/schedule/dayOfWeek';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedule')
export class ScheduleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  barberId: string;

  @Column({
    type: 'enum',
    enum: DayOfWeek,
  })
  dayOfWeek: DayOfWeek;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  barberShopId: string;
}
