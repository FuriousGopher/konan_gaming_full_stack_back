import {
  BadRequestException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SlotMachineService } from './slot-machine.service';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { UserIdFromGuard } from '../decorators/user-id-from-guard.decorator';

@Controller('slot-machine')
export class SlotMachineController {
  constructor(private readonly slotMachineService: SlotMachineService) {}

  @UseGuards(JwtRefreshGuard)
  @Post('/spin')
  async spin(@UserIdFromGuard() userId: any) {
    const result = await this.slotMachineService.makeSpin(userId);

    if (!result) return  new BadRequestException();

    return result;
  }
}
