import { Module } from '@nestjs/common';
import { SendGamesInfoController } from './send-games-info.controller';

@Module({
  controllers: [SendGamesInfoController],
  providers: [],
})
export class SendGamesInfoModule {}
