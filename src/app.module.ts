import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './db/database.module';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './login/login.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ThumbnailsModule } from './thumbnails/thumbnails.module';
import { SlotMachineModule } from './slot-machine/slot-machine.module';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh.strategy';
import { SendGamesInfoModule } from './send-games-data/send-games-info.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LoginModule,
    JwtModule,
    ThumbnailsModule,
    SlotMachineModule,
    SendGamesInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy, JwtRefreshTokenStrategy],
})
export class AppModule {}
