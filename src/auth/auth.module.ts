import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from '../db/repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../db/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
