import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateBarberDto } from 'src/core/application/barber/dtos/CreateBarberDto';
import { UpdateBarberDto } from 'src/core/application/barber/dtos/UpdateBarberDto';
import { BarberCreateUseCase } from 'src/core/application/barber/use-cases/BarberCreateUseCase';
import { BarberDeleteUseCase } from 'src/core/application/barber/use-cases/BarberDeleteUseCase';
import { BarberGetAllUseCase } from 'src/core/application/barber/use-cases/BarberGetAllUseCase';
import { BarberGetByIdUseCase } from 'src/core/application/barber/use-cases/BarberGetByIdUseCase';
import { BarberUpdateUseCase } from 'src/core/application/barber/use-cases/BarberUpdateUseCase';

@Controller('barber')
export class BarberController {
  constructor(
    @Inject('BarberUseCases')
    private readonly barberUseCases: {
      create: BarberCreateUseCase;
      update: BarberUpdateUseCase;
      getAll: BarberGetAllUseCase;
      getById: BarberGetByIdUseCase;
      delete: BarberDeleteUseCase;
    },
  ) {}

  @Post()
  async createUser(@Body() createBarberDto: CreateBarberDto) {
    try {
      await this.barberUseCases.create.execute(createBarberDto);
    } catch (error) {
      console.error(error);
    }
  }

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
