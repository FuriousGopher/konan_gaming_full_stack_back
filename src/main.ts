import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from '@nestjs/class-validator';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
