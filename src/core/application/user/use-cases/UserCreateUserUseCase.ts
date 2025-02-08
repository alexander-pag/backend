import { BarberValidationService } from 'src/core/domain/barber/service/BarberValidationService';
import { Client } from 'src/core/domain/client/client.entity';
import { ClientValidationService } from 'src/core/domain/client/service/ClientValidationService';
import { UserValidationService } from 'src/core/domain/user/service/UserValidationService';
import { Roles } from 'src/core/value-objects/user-role/roles';
import { CreateClientDto } from '../../client/dtos/CreateClientDto';
import { Barber } from 'src/core/domain/barber/barber.entity';
import { CreateBarberDto } from '../../barber/dtos/CreateBarberDto';
import { CreateUserInput } from '../dtos/CreateUserInput';
import { UserEmail } from 'src/core/domain/user/value-objects/userEmail';
import { User } from 'src/core/domain/user/user.entity';
import { UserEmailAlreadyExistsError } from '../exceptions/UserEmailAlreadyExistsError';
import { UserPhone } from 'src/core/domain/user/value-objects/userPhone';
import { UserPhoneAlreadyExistsError } from '../exceptions/UserPhoneAlreadyExistsError';

export class UserCreateUserUseCase {
  constructor(
    private readonly userService: UserValidationService,
    private readonly clientService: ClientValidationService,
    private readonly barberService: BarberValidationService,
  ) {}

  async execute(input: CreateUserInput): Promise<void> {
    const { email, role, phone } = input;

    const userEmailExists = await this.userService.isEmailUnique(
      new UserEmail(email),
    );
    if (userEmailExists) {
      throw new UserEmailAlreadyExistsError('El email ya existe.');
    }

    const userPhoneExists = await this.userService.isPhoneUnique(
      new UserPhone(phone),
    );
    if (userPhoneExists) {
      throw new UserPhoneAlreadyExistsError('El teléfono ya existe.');
    }

    const user = User.create({
      barberShopId: input.barberShopId,
      name: input.name,
      email: input.email,
      password: input.password,
      phone: input.phone,
      role: input.role,
    });

    const createdUser = await this.userService.save(user);

    if (role === Roles.CLIENT) {
      const client = Client.create(new CreateClientDto(createdUser.id.value));
      await this.clientService.save(client);
    } else if (role === Roles.BARBER) {
      const barber = Barber.create(new CreateBarberDto(createdUser.id.value));
      await this.barberService.save(barber);
    }
  }
}
