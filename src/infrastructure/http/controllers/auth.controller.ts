import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/core/application/user/dtos/CreateUserDto';
import { UserLoginUseCase } from 'src/core/application/user/use-cases/UserLoginUseCase';
import { UserRegisterUseCase } from 'src/core/application/user/use-cases/UserRegisterUseCase';
import { Public } from 'src/infrastructure/decorators/public.decorator';
import { AuthService } from 'src/infrastructure/services/AuthService';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userLoginUseCase: UserLoginUseCase,
    private readonly userRegisterUseCase: UserRegisterUseCase,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userLoginUseCase.execute(email, password);
    const tokens = this.authService.generateTokens(user);

    return {
      barberShopId: user.barberShopId.value,
      tokens,
    };
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userRegisterUseCase.execute(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const tokens = this.authService.refreshAccessToken(body.refreshToken);

    return tokens;
  }
}
