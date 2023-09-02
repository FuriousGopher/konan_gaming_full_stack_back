import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersRepository } from '../db/repositories/users.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UsersRepository) {
    super({
      usernameField: 'loginOrEmail',
    });
  }

  async validate(loginOrEmail: string, password: string) {
    const user = await this.userRepository.findUser(loginOrEmail);

    if (!user) return false;

    const compare = await bcrypt.compare(password, user.passwordHash);

    if (compare) {
      return user;
    }
    return false;
  }
}
