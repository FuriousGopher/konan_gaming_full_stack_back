import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { sendGameData } from './utils/send-game-data';

@Controller('send')
export class SendGamesInfoController {
  @Get()
  async getGameData(@Res() res: Response, @Query('title') title?: string) {
    const gameData = await sendGameData();

    if (title) {
      const filteredGameData = gameData.filter((game) =>
        game.title.toLowerCase().includes(title.toLowerCase()),
      );

      res.json(filteredGameData);
    } else {
      res.json(gameData);
    }
  }
}
