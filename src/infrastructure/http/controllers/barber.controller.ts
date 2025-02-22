import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateBarberDto } from 'src/core/application/barber/dtos/UpdateBarberDto';
import { BarberDeleteUseCase } from 'src/core/application/barber/use-cases/BarberDeleteUseCase';
import { BarberGetAllUseCase } from 'src/core/application/barber/use-cases/BarberGetAllUseCase';
import { BarberGetByIdUseCase } from 'src/core/application/barber/use-cases/BarberGetByIdUseCase';
import { BarberUpdateUseCase } from 'src/core/application/barber/use-cases/BarberUpdateUseCase';

@Controller('barber')
export class BarberController {
  constructor(
    @Inject('BarberUseCases')
    private readonly barberUseCases: {
      update: BarberUpdateUseCase;
      getAll: BarberGetAllUseCase;
      getById: BarberGetByIdUseCase;
      delete: BarberDeleteUseCase;
    },
  ) {}

  @Get()
  async getAllUsers() {
    try {
      return await this.barberUseCases.getAll.execute();
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      return await this.barberUseCases.getById.execute(id);
    } catch (error) {
      console.error(error);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateBarberDto: UpdateBarberDto,
  ) {
    try {
      return await this.barberUseCases.update.execute(id, updateBarberDto);
    } catch (error) {
      console.error(error);
    }
  }
}
