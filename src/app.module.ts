import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppointmentEntity } from './infrastructure/persistence/entities/AppointmentEntity';
import { AppointmentModule } from './infrastructure/modules/appointment.module';
import { UserEntity } from './infrastructure/persistence/entities/UserEntity';
import { UserModule } from './infrastructure/modules/user.module';
import { ClientModule } from './infrastructure/modules/client.module';
import { ClientEntity } from './infrastructure/persistence/entities/ClientEntity';
import { BarberEntity } from './infrastructure/persistence/entities/BarberEntity';
import { BarberModule } from './infrastructure/modules/barber.module';
import { ServiceEntity } from './infrastructure/persistence/entities/ServiceEntity';
import { ServiceModule } from './infrastructure/modules/service.module';
import { BarberShopEntity } from './infrastructure/persistence/entities/BarberShopEntity';
import { BarberShopModule } from './infrastructure/modules/barberShop.module';
import { AuthModule } from './infrastructure/modules/auth.module';
import { SubscriptionEntity } from './infrastructure/persistence/entities/SubscriptionEntity';
import { SubscriptionModule } from './infrastructure/modules/subscription.module';
import { PaymentEntity } from './infrastructure/persistence/entities/PaymentEntity';
import { PaymentModule } from './infrastructure/modules/payment.module';
import { ReportsModule } from './infrastructure/modules/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRE_DATABASE_URL,
      entities: [
        AppointmentEntity,
        UserEntity,
        ClientEntity,
        BarberEntity,
        ServiceEntity,
        BarberShopEntity,
        SubscriptionEntity,
        PaymentEntity,
      ],
      synchronize: true,
    }),
    AppointmentModule,
    UserModule,
    ClientModule,
    BarberModule,
    ServiceModule,
    BarberShopModule,
    AuthModule,
    SubscriptionModule,
    PaymentModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
