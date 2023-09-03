import { Test, TestingModule } from '@nestjs/testing';
import { SendGamesInfoController } from './send-games-info.controller';
import { SendGamesInfoService } from './send-games-data.service';

describe('SendController', () => {
  let controller: SendGamesInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendGamesInfoController],
      providers: [SendGamesInfoService],
    }).compile();

    controller = module.get<SendGamesInfoController>(SendGamesInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
