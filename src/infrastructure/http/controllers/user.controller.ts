import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserInput } from 'src/core/application/user/dtos/CreateUserInput';
import { UpdateUserDto } from 'src/core/application/user/dtos/UpdateUserDto';
import { UserCreateUserUseCase } from 'src/core/application/user/use-cases/UserCreateUserUseCase';
import { UserGetAllByBarberShopUseCase } from 'src/core/application/user/use-cases/UserGetAllByBarberShopUseCase';
import { UserGetAllUseCase } from 'src/core/application/user/use-cases/UserGetAllUseCase';
import { UserGetByIdUseCase } from 'src/core/application/user/use-cases/UserGetByIdUseCase';
import { UserResetPasswordUseCase } from 'src/core/application/user/use-cases/UserResetPasswordUseCase';
import { UserUpdateUseCase } from 'src/core/application/user/use-cases/UserUpdateUseCase';

export class LoginDto {
  email: string;
  password: string;
}

@Controller('user')
export class UserController {
  constructor(
    @Inject('UserUseCases')
    private readonly userUseCases: {
      update: UserUpdateUseCase;
      getAll: UserGetAllUseCase;
      getById: UserGetByIdUseCase;
      resetPassword: UserResetPasswordUseCase;
      create: UserCreateUserUseCase;
      getAllByBarberShop: UserGetAllByBarberShopUseCase;
    },
  ) {}

  @Post()
  async createUser(@Body() createUserInput: CreateUserInput) {
    try {
      return await this.userUseCases.create.execute(createUserInput);
    } catch (error) {
      console.error(error);
    }
  }

  @Get('barber-shop/:id')
  async getAllUsers(@Param('id') id: string) {
    try {
      return await this.userUseCases.getAllByBarberShop.execute(id);
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      return await this.userUseCases.getById.execute(id);
    } catch (error) {
      console.error(error);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.userUseCases.update.execute(id, updateUserDto);
    } catch (error) {
      console.error(error);
    }
  }

  @Put(':id/reset-password')
  async resetPassword(
    @Param('id') id: string,
    @Body('password') password: string,
  ) {
    try {
      return await this.userUseCases.resetPassword.execute(id, password);
    } catch (error) {
      console.error(error);
    }
  }
}
