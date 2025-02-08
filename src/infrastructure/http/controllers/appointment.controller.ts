import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { CreateAppointmentDto } from 'src/core/application/appointment/dtos/CreateAppointmentDto';
import { AppointmentCreateUseCase } from 'src/core/application/appointment/use-cases/AppointmentCreateUseCase';
import { AppointmentUpdateUseCase } from 'src/core/application/appointment/use-cases/AppointmentUpdateUseCase';
import { AppointmentDeleteUseCase } from 'src/core/application/appointment/use-cases/AppointmetDeleteUseCase';
import { AppointmentGetAllUseCase } from 'src/core/application/appointment/use-cases/AppointmetGetAllUseCase';
import { AppointmentGetByIdUseCase } from 'src/core/application/appointment/use-cases/AppointmetGetByIdUseCase';

@Controller('appointment')
export class AppointmentController {
  constructor(
    @Inject('AppointmentUseCases')
    private readonly appointmentUseCases: {
      create: AppointmentCreateUseCase;
      update: AppointmentUpdateUseCase;
      getAll: AppointmentGetAllUseCase;
      getById: AppointmentGetByIdUseCase;
      delete: AppointmentDeleteUseCase;
    },
  ) {}

  @Get(':id')
  async getAppointmentById(@Param('id') id: string) {
    try {
      return await this.appointmentUseCases.getById.execute(id);
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @Get()
  async getAppointments() {
    try {
      return await this.appointmentUseCases.getAll.execute();
    } catch (error) {
      console.error(error);
    }
  }

  @Post()
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    console.log(createAppointmentDto);

    try {
      return await this.appointmentUseCases.create.execute(
        createAppointmentDto,
      );
    } catch (error) {
      console.error(error);
    }
  }

  @Delete(':id')
  async deleteAppointment(@Param('id') id: string) {
    try {
      return await this.appointmentUseCases.delete.execute(id);
    } catch (error) {
      console.error(error);
    }
  }
}
