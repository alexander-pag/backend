import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBarberShopDto } from 'src/core/application/barberShop/dto/CreateBarberShopDto';
import { UpdateBarberShopDto } from 'src/core/application/barberShop/dto/UpdateBarberShopDto';
import { BarberShopCreateUseCase } from 'src/core/application/barberShop/use-cases/BarberShopCreateUseCase';
import { BarberShopDeleteUseCase } from 'src/core/application/barberShop/use-cases/BarberShopDeleteUseCase';
import { BarberShopGetAllUseCase } from 'src/core/application/barberShop/use-cases/BarberShopGetAllUseCase';
import { BarberShopGetByIdUseCase } from 'src/core/application/barberShop/use-cases/BarberShopGetByIdUseCase';
import { BarberShopUpdateUseCase } from 'src/core/application/barberShop/use-cases/BarberShopUpdateUseCase';

@Controller('barber-shop')
export class BarberShopController {
  constructor(
    @Inject('BarberShopUseCases')
    private readonly barberShopUseCases: {
      create: BarberShopCreateUseCase;
      update: BarberShopUpdateUseCase;
      getAll: BarberShopGetAllUseCase;
      getById: BarberShopGetByIdUseCase;
      delete: BarberShopDeleteUseCase;
    },
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createBarberShopDto: CreateBarberShopDto) {
    return await this.barberShopUseCases.create.execute(createBarberShopDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers() {
    return await this.barberShopUseCases.getAll.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUserById(@Param('id') id: string) {
    return await this.barberShopUseCases.getById.execute(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateBarberShopDto: UpdateBarberShopDto,
  ) {
    return await this.barberShopUseCases.update.execute(
      id,
      updateBarberShopDto,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    return await this.barberShopUseCases.delete.execute(id);
  }
}
