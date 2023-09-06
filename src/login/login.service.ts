import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {UsersRepository} from "../db/repositories/users.repository";

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,

  ) {}
  async createToken(userId: any) {
    const tokenPayload = { sub: userId };

    return this.jwtService.sign(tokenPayload, {
      secret: this.configService.get('SECRET_KEY'),
      expiresIn: '10h',
    });
  }

  async getUserInfo(userId: any) {
    const user = await this.usersRepository.findUser(userId);

    if (!user) return false;

    return {
      userName: user.login,
      coins: user.coins,
    }

  }
}
