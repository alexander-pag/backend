import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/core/application/user/dtos/CreateUserDto';
import { UpdateUserDto } from 'src/core/application/user/dtos/UpdateUserDto';
import { UserCreateAdminUseCase } from 'src/core/application/user/use-cases/UserCreateAdminUseCase';
import { UserCreateUserUseCase } from 'src/core/application/user/use-cases/UserCreateUserUseCase';
import { UserGetAllByBarberShopUseCase } from 'src/core/application/user/use-cases/UserGetAllByBarberShopUseCase';
import { UserGetAllUseCase } from 'src/core/application/user/use-cases/UserGetAllUseCase';
import { UserGetByIdUseCase } from 'src/core/application/user/use-cases/UserGetByIdUseCase';
import { UserResetPasswordUseCase } from 'src/core/application/user/use-cases/UserResetPasswordUseCase';
import { UserUpdateUseCase } from 'src/core/application/user/use-cases/UserUpdateUseCase';
import { Public } from 'src/infrastructure/decorators/public.decorator';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infrastructure/guards/roles.guard';

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
      createAdmin: UserCreateAdminUseCase;
    },
  ) {}

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userUseCases.create.execute(createUserDto);
    } catch (error) {
      console.error(error);
    }
  }

  @Public()
  @Post('admin')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userUseCases.createAdmin.execute(createUserDto);
    } catch (error) {
      console.error(error);
    }
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin')
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
