import {Controller, Post, Body, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(204)
  @Post('/registration')
  async registration(@Body() createAuthDto: RegistrationDto) {
    return this.authService.create(createAuthDto);
  }

}
