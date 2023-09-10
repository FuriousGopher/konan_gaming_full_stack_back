import {Controller, Post, UseGuards, Res, Get, BadRequestException, NotFoundException} from '@nestjs/common';
import { LoginService } from './login.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserIdFromGuard } from '../decorators/user-id-from-guard.decorator';
import { Response } from 'express';
import {JwtRefreshGuard} from "../guards/jwt-refresh.guard";

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(
    @UserIdFromGuard() userId: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      const token = await this.loginService.createToken(userId);
      res.cookie('refreshToken', token, {
        sameSite: 'none',
        secure: true
      });
    } catch (error) {
      return new BadRequestException();
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Get('/me')
  async getMe(@UserIdFromGuard() userId: any) {
    try {
      const result = await this.loginService.getUserInfo(userId);

      if (!result) return new NotFoundException();

      return result;
    } catch (error) {
      return new BadRequestException();
    }
  }
}
