import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => ({
        type: 'postgres',
        url: configService.get<string>('URL_CLOUD_DB'),
        synchronize: true,
        autoLoadEntities: true,
        entities: [User],
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class DatabaseModule {}
