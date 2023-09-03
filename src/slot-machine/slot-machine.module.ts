import { Module } from '@nestjs/common';
import { SlotMachineService } from './slot-machine.service';
import { SlotMachineController } from './slot-machine.controller';
import { UsersRepository } from '../db/repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../db/entities/user.entity';
import { Reels } from './slot-machine-config/reels-of-slot-machine';

@Module({
  controllers: [SlotMachineController],
  providers: [SlotMachineService, UsersRepository, Reels],
  imports: [TypeOrmModule.forFeature([User])],
})
export class SlotMachineModule {}
