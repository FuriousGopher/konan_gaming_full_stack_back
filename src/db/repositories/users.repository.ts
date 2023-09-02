import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  saveUser(user: User) {
    return this.usersRepository.save(user);
  }

  async findUser(loginOrEmail: string) {
    console.log(loginOrEmail);
    return this.usersRepository
      .createQueryBuilder('u')
      .where(`u.login = :loginOrEmail OR u.email = :loginOrEmail`, {
        loginOrEmail: loginOrEmail,
      })
      .getOne();
  }
}
