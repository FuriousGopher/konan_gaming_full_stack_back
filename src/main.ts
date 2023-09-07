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
  app.enableCors({ credentials: true, origin: 'https://konan-gaming-full-stack-front.vercel.app' });
    console.log(process.env.SECRET_KEY)
    console.log(process.env.FRONT_URL)
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
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
