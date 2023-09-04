import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { sendGameData } from './utils/send-game-data';

@Controller('send')
export class SendGamesInfoController {
  @Get()
  async getGameData(@Res() res: Response, @Query('title') title?: string) {
    const fetchGameData = await sendGameData(title);

    res.json(fetchGameData);
  }
}
