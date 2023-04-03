import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ShortService } from './short/short.service';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    private shortService: ShortService,
  ) {}

  @Get(':code')
  async redirect(@Res() res: Response, @Param('code') code: string) {
    const url = await this.shortService.getUrl(code);
    return res.redirect(url);
  }

  @Post()
  async createUrl(@Body('url') url: string, @Res() res: Response) {
    const code = await this.shortService.createUrl(url);
    return res.status(201).json({ code });
  }
}
