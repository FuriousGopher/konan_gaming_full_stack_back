import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from '@nestjs/class-validator';
import {TrimPipe} from "./pipes/trim.pipe";
import {ValidationPipe} from "@nestjs/common";
import {customExceptionFactory} from "./pipes/exception.factory";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();
  app.useGlobalPipes(
      new TrimPipe(),
      new ValidationPipe({
        transform: true,
        stopAtFirstError: true,
        exceptionFactory: customExceptionFactory,
      }),
  );

  await app.listen(5000);
}
bootstrap();
