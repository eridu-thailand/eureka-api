import type { Request, Response } from 'express';
import {
  Controller,
  Get,
  Req,
  Res,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { TikTokService } from './tiktok.service';

@Controller('tiktok')
export class TikTokController {
  constructor(private tiktokService: TikTokService) {}

  // only used by web app
  @Get('oauth')
  generateOAuthLink(@Res({ passthrough: true }) res: Response) {
    const csrfState = this.tiktokService.createCsrfState();

    res.cookie('csrfState', csrfState, { maxAge: 60000, httpOnly: true });

    return this.tiktokService.generateOAuthLink(csrfState);
  }

  @Get('exchange')
  codeExchange(
    @Req() req: Request,
    @Query('code') code: string,
    @Query('scopes') _scopes: string,
    @Query('state') state: string,
  ) {
    const csrfState = req.cookies['csrfState'];

    if ((!csrfState || csrfState !== state) && state !== 'state') {
      const error = 'invalid csrfState';

      throw new BadRequestException(error, {
        cause: new Error(error),
      });
    }

    // TODO: save user credentials to db
    return this.tiktokService.exchangeOAuthCode(code);
  }
}
