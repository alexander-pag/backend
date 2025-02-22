import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../services/AuthService';
import { AuthController } from '../http/controllers/auth.controller';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { SharedModule } from './shared.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    UserModule,
    SharedModule,
  ],
  providers: [AuthService, JwtService, JwtAuthGuard, RolesGuard, JwtStrategy],
  exports: [AuthService, JwtService, JwtAuthGuard, RolesGuard],
  controllers: [AuthController],
})
export class AuthModule {}
