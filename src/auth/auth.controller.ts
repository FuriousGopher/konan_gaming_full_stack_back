import {Controller, Post, Body, HttpCode, BadRequestException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async registration(@Body() createAuthDto: RegistrationDto) {
    try {
      const result = await this.authService.create(createAuthDto);
      if (!result) {
        throw new BadRequestException('Login or email is already takdeen');
      }
      return result;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

}
