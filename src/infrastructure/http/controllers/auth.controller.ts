import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/core/application/user/dtos/CreateUserDto';
import { UserLoginUseCase } from 'src/core/application/user/use-cases/UserLoginUseCase';
import { UserRegisterUseCase } from 'src/core/application/user/use-cases/UserRegisterUseCase';
import { AuthService } from 'src/infrastructure/services/AuthService';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userLoginUseCase: UserLoginUseCase,
    private readonly userRegisterUseCase: UserRegisterUseCase,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userLoginUseCase.execute(email, password);
    const tokens = this.authService.generateTokens(user);

    return tokens;
  }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userRegisterUseCase.execute(createUserDto);
    } catch (error) {
      console.error(error);
    }
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const tokens = this.authService.refreshAccessToken(body.refreshToken);

    return tokens;
  }
}
