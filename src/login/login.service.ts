import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async createToken(userId: any) {
    const tokenPayload = { sub: userId };

    return this.jwtService.sign(tokenPayload, {
      secret: this.configService.get('SECRET_KEY'),
      expiresIn: '10h',
    });
  }
}
