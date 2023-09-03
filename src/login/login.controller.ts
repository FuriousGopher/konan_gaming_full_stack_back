import { Controller, Post, UseGuards, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserIdFromGuard } from '../decorators/user-id-from-guard.decorator';
import { Response } from 'express';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(
    @UserIdFromGuard() userId: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.loginService.createToken(userId);
    res.cookie('refreshToken', token);
  }
}
