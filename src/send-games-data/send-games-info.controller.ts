import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('send')
export class SendGamesInfoController {
  @Get()
  async getGameData(@Res() res: Response) {
    return fs.readFile(
      'src/send-games-data/games-info/game-data.json',
      (err, data) => {
        if (err) throw err;
        const gamesData = JSON.parse(data.toString());
        res.json(gamesData);
      },
    );
  }
}
