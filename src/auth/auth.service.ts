import {Injectable} from '@nestjs/common';
import {RegistrationDto} from './dto/create-auth.dto';
import {User} from '../db/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import {UsersRepository} from '../db/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(protected readonly usersRepository: UsersRepository) {}
  async create(createAuthDto: RegistrationDto) {
    const user = new User();
    user.login = createAuthDto.login;
    user.passwordHash = await bcrypt.hash(createAuthDto.password, 10);
    user.email = createAuthDto.email;

    return await this.usersRepository.saveUser(user);

  }
}
