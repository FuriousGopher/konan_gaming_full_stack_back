import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { JwtService } from '@nestjs/jwt';
import {UsersRepository} from "../db/repositories/users.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../db/entities/user.entity";

@Module({
  controllers: [LoginController],
  providers: [LoginService, JwtService, UsersRepository],
  imports: [TypeOrmModule.forFeature([User])],
})
export class LoginModule {}
