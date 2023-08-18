import type { Request, Response } from 'express';
import {
  Controller,
  Get,
  Req,
  Res,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { TikTokService } from './tiktok.service';
import { AuthGuard } from '~/auth/auth.guard';

@Controller('tiktok')
@UseGuards(AuthGuard)
export class TikTokController {
  constructor(private tiktokService: TikTokService) {}

  // only used by web app
  @Get('oauth')
  generateOAuthLink(@Res({ passthrough: true }) res: Response) {
    const csrfState = this.tiktokService.createCsrfState();

    res.cookie('csrfState', csrfState, { maxAge: 60000, httpOnly: true });

    return this.tiktokService.generateOAuthLink(csrfState);
  }

  @Get('code-exchange')
  async codeExchange(
    @Req() req: Request & { user: { id: string } },
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

    const { access_token: accessToken, refresh_token: refreshToken } =
      await this.tiktokService.exchangeOAuthCode(code);

    const userId = req.user.id;

    return this.tiktokService.updateUserCredentials({
      userId,
      accessToken,
      refreshToken,
    });
  }
}
