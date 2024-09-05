import { Controller, Post, Body, ValidationPipe, UsePipes, Res } from '@nestjs/common';

import { RegisterUserDto } from 'src/modules/auth/dto/register-user.dto';
import { AuthService } from 'src/modules/auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() body: LoginUserDto, @Res() res) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.authService.validateUser(body.email, body.password);
    const token = await this.authService.login(user);

    return res.status(200).json({
      code: 200,
      message: "Login successful",
      data: {
        ...user,
        token
      }
    });
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() body: RegisterUserDto, @Res() res) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.authService.register(body.name, body.email, body.password);
    const token = await this.authService.login(user);

    return res.status(200).json({
      code: 200,
      message: "Registration successful",
      data: {
        ...user,
        token
      }
    });
  }
}
