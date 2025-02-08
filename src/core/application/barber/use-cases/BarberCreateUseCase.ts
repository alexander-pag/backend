import { UserId } from 'src/core/domain/user/value-objects/userId';
import { IBarberRepository } from 'src/core/domain/barber/repositories/IBarberRepository';
import { CreateBarberDto } from '../dtos/CreateBarberDto';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { UserNotFoundError } from '../../user/exceptions/UserNotFoundError';
import { Barber } from 'src/core/domain/barber/barber.entity';

export class BarberCreateUseCase {
  constructor(
    private readonly barberRepository: IBarberRepository,
    private readonly userService: UserValidationService,
  ) {}

  async execute(createBarberDto: CreateBarberDto): Promise<void> {
    const userExist = await this.userService.exists(
      new UserId(createBarberDto.userId),
    );

    if (!userExist) {
      throw new UserNotFoundError('El usuario no existe.');
    }

    const barber = Barber.create(createBarberDto);

    await this.barberRepository.save(barber);
  }
}
