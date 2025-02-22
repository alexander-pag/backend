import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateClientDto } from 'src/core/application/client/dtos/UpdateClientDto';
import { ClientCreateUseCase } from 'src/core/application/client/use-cases/ClientCreateUseCase';
import { ClientDeleteUseCase } from 'src/core/application/client/use-cases/ClientDeleteUseCase';
import { ClientGetAllUseCase } from 'src/core/application/client/use-cases/ClientGetAllUseCase';
import { ClientGetByIdUseCase } from 'src/core/application/client/use-cases/ClientGetByIdUseCase';
import { ClientUpdateUseCase } from 'src/core/application/client/use-cases/ClientUpdateUseCase';

@Controller('client')
export class ClientController {
  constructor(
    @Inject('ClientUseCases')
    private readonly clientUseCases: {
      update: ClientUpdateUseCase;
      getAll: ClientGetAllUseCase;
      getById: ClientGetByIdUseCase;
      delete: ClientDeleteUseCase;
    },
  ) {}

  @Get()
  async getAllUsers() {
    try {
      return await this.clientUseCases.getAll.execute();
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      return await this.clientUseCases.getById.execute(id);
    } catch (error) {
      console.error(error);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    try {
      return await this.clientUseCases.update.execute(id, updateClientDto);
    } catch (error) {
      console.error(error);
    }
  }
}
