import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../services/AuthService';
import { AuthController } from '../http/controllers/auth.controller';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtService],
  exports: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
