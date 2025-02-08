import { UserId } from 'src/core/domain/user/value-objects/userId';
import { IBarberRepository } from 'src/core/domain/barber/repositories/IBarberRepository';
import { UpdateBarberDto } from '../dtos/UpdateBarberDto';
import { BarberNotFoundError } from '../exceptions/BarberNotFoundError';
import { UserNotFoundError } from '../../user/exceptions/UserNotFoundError';
import { BarberSpecialty } from 'src/core/domain/barber/value-objects/barberSpecialty';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { BarberValidationService } from 'src/core/domain/barber/service/BarberValidationService';
import { BarberId } from 'src/core/domain/barber/value-objects/barberId';

export class BarberUpdateUseCase {
  constructor(
    private readonly barberRepository: IBarberRepository,
    private readonly barberService: BarberValidationService,
    private readonly userService: UserValidationService,
  ) {}

  async execute(id: string, updateBarberDto: UpdateBarberDto): Promise<void> {
    const existingBarber = await this.barberService.exists(new BarberId(id));

    if (!existingBarber) {
      throw new BarberNotFoundError('El barbero no existe.');
    }

    const existingUser = await this.userService.exists(
      new UserId(updateBarberDto.userId),
    );

    if (!existingUser) {
      throw new UserNotFoundError('El usuario no existe.');
    }

    const barber = await this.barberRepository.findById(new BarberId(id));

    const updatedBarber = barber.update({
      userId: new UserId(updateBarberDto.userId),
      specialty: updateBarberDto.specialty
        ? new BarberSpecialty(updateBarberDto.specialty)
        : undefined,
    });

    await this.barberRepository.save(updatedBarber);
  }
}
