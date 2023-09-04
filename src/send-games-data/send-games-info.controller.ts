import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { fetchGameData } from './utils/fetch-game-data';

@Controller('send')
export class SendGamesInfoController {
  @Get()
  async getGameData(@Res() res: Response, @Query('title') title?: string) {
    const gameData = await fetchGameData(title);

    res.json(gameData);
  }
}
