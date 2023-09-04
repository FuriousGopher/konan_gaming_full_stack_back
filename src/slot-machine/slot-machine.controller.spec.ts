import { Test, TestingModule } from '@nestjs/testing';
import { SlotMachineController } from './slot-machine.controller';
import { SlotMachineService } from './slot-machine.service';

describe('SlotMachineController', () => {
  let controller: SlotMachineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlotMachineController],
      providers: [SlotMachineService],
    }).compile();

    controller = module.get<SlotMachineController>(SlotMachineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
