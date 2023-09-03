import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../db/repositories/users.repository';
import { Reels } from './slot-machine-config/reels-of-slot-machine';

@Injectable()
export class SlotMachineService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly reals: Reels,
  ) {}
  async makeSpin(userId: string) {
    const user = await this.usersRepository.findUser(userId);

    if (!user) return false;

    user.coins -= 1;

    const results = {
      Reel1: this.reals.reel1[Math.floor(Math.random() * 8)],
      Reel2: this.reals.reel2[Math.floor(Math.random() * 8)],
      Reel3: this.reals.reel3[Math.floor(Math.random() * 8)],
    };

    let reward = 0;

    if (results.Reel1 === results.Reel2 && results.Reel2 === results.Reel3) {
      switch (results.Reel1) {
        case 'cherry':
          reward = 50;
          break;
        case 'apple':
          reward = 20;
          break;
        case 'banana':
          reward = 15;
          break;
        case 'lemon':
          reward = 3;
          break;
      }
    } else if (
      results.Reel1 === results.Reel2 ||
      results.Reel2 === results.Reel3 ||
      results.Reel1 === results.Reel3
    ) {
      switch (results.Reel1) {
        case 'cherry':
          reward = 40;
          break;
        case 'apple':
          reward = 10;
          break;
        case 'banana':
          reward = 5;
          break;
      }
    }

    const userReword = (user.coins += reward);

    await this.usersRepository.updateUserCoinsBalance(userId, userReword);

    return {
      yourWin: reward,
      yourId: user.id,
    };
  }
}
