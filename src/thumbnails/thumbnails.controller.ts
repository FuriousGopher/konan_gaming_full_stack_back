import { Controller, Get, Res } from '@nestjs/common';
import * as path from 'path';
import { Response } from 'express';

@Controller('thumbnails')
export class ThumbnailsController {
  @Get('/default')
  async getDefaultThumbnail(@Res() res: Response) {
    const filePath = path.join(
      __dirname,
      '/../public',
      'default-thumbnail.jpg',
    );
    res.sendFile(filePath);
  }
}
