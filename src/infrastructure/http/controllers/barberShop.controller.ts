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
  UseGuards,
} from '@nestjs/common';
import { CreateBarberShopDto } from 'src/core/application/barberShop/dto/CreateBarberShopDto';
import { UpdateBarberShopDto } from 'src/core/application/barberShop/dto/UpdateBarberShopDto';
import { BarberShopCreateUseCase } from 'src/core/application/barberShop/use-cases/BarberShopCreateUseCase';
import { BarberShopDeleteUseCase } from 'src/core/application/barberShop/use-cases/BarberShopDeleteUseCase';
import { BarberShopGetAllUseCase } from 'src/core/application/barberShop/use-cases/BarberShopGetAllUseCase';
import { BarberShopGetByIdUseCase } from 'src/core/application/barberShop/use-cases/BarberShopGetByIdUseCase';
import { BarberShopUpdateUseCase } from 'src/core/application/barberShop/use-cases/BarberShopUpdateUseCase';
import { Public } from 'src/infrastructure/decorators/public.decorator';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infrastructure/guards/roles.guard';

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
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async createBarberShop(@Body() createBarberShopDto: CreateBarberShopDto) {
    return await this.barberShopUseCases.create.execute(createBarberShopDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('super_admin')
  @HttpCode(HttpStatus.OK)
  async getAllBarberShops() {
    return await this.barberShopUseCases.getAll.execute();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'client', 'barber')
  @HttpCode(HttpStatus.OK)
  async getBarberShopById(@Param('id') id: string) {
    return await this.barberShopUseCases.getById.execute(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.OK)
  async updateBarberShop(
    @Param('id') id: string,
    @Body() updateBarberShopDto: UpdateBarberShopDto,
  ) {
    return await this.barberShopUseCases.update.execute(
      id,
      updateBarberShopDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super_admin', 'admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBarberShop(@Param('id') id: string) {
    return await this.barberShopUseCases.delete.execute(id);
  }
}
