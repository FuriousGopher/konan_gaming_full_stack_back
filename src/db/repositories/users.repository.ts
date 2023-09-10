import {Injectable} from '@nestjs/common';
import {User} from '../entities/user.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
      @InjectRepository(User) private readonly usersRepository: Repository<User>,
    ) {}
  async saveUser(user: User) {
    try {
      return await this.usersRepository.save(user);
    } catch (e) {
     return null;
    }
  }

  async findUserByLoginOrEmail(loginOrEmail: string) {
    return this.usersRepository
      .createQueryBuilder('u')
      .where(`u.login = :loginOrEmail OR u.email = :loginOrEmail`, {
        loginOrEmail: loginOrEmail,
      })
      .getOne();
  }

  async findUser(userId: string) {
    return this.usersRepository
      .createQueryBuilder('u')
      .where(`u.id = :userId`, { userId: userId })
      .getOne();
  }

  updateUserCoinsBalance(userId: string, newCoinsBalance: number) {
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ coins: newCoinsBalance })
      .where('id = :userId', { userId })
      .execute();
  }
}
