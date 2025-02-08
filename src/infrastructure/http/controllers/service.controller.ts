import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateServiceDto } from 'src/core/application/service/dtos/CreateServiceDto';
import { UpdateServiceDto } from 'src/core/application/service/dtos/UpdateServiceDto';
import { ServiceCreateUseCase } from 'src/core/application/service/use-cases/ServiceCreateUseCase';
import { ServiceDeleteUseCase } from 'src/core/application/service/use-cases/ServiceDeleteUseCase';
import { ServiceGetAllUseCase } from 'src/core/application/service/use-cases/ServiceGetAllUseCase';
import { ServiceGetByIdUseCase } from 'src/core/application/service/use-cases/ServiceGetByIdUseCase';
import { ServiceUpdateUseCase } from 'src/core/application/service/use-cases/ServiceUpdateUseCase';

@Controller('service')
export class ServiceController {
  constructor(
    @Inject('ServiceUseCases')
    private readonly serviceUseCases: {
      create: ServiceCreateUseCase;
      update: ServiceUpdateUseCase;
      getAll: ServiceGetAllUseCase;
      getById: ServiceGetByIdUseCase;
      delete: ServiceDeleteUseCase;
    },
  ) {}

  @Post()
  async createUser(@Body() createServiceDto: CreateServiceDto) {
    try {
      return await this.serviceUseCases.create.execute(createServiceDto);
    } catch (error) {
      console.error(error);
    }
  }

  @Get()
  async getAllUsers() {
    try {
      return await this.serviceUseCases.getAll.execute();
    } catch (error) {
      console.error(error);
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    try {
      return await this.serviceUseCases.getById.execute(id);
    } catch (error) {
      console.error(error);
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    try {
      return await this.serviceUseCases.update.execute(id, updateServiceDto);
    } catch (error) {
      console.error(error);
    }
  }
}
