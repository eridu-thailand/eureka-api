import { map, catchError } from 'rxjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import type { TikTokExchangeCodeResponse } from '~/types';

@Injectable()
export class TikTokService {
  constructor(
    private configService: ConfigService,
    private http: HttpService,
  ) {}

  createCsrfState() {
    return Math.random().toString(36).substring(2);
  }

  // only used by web app
  generateOAuthLink(csrfState = 'state') {
    // android and iOS uses PKCE flow to exchange authorization code
    const CLIENT_KEY = this.configService.getOrThrow('TIKTOK_CLIENT_KEY');
    const CLIENT_CALLBACK = this.configService.getOrThrow(
      'TIKTOK_CLIENT_CALLBACK',
    );

    let url =
      this.configService.get('TIKTOK_AUTHORIZE_URI') ||
      'https://www.tiktok.com/v2/auth/authorize';

    // the following params need to be in `application/x-www-form-urlencoded` format.
    url += `?client_key=${encodeURIComponent(CLIENT_KEY)}`;
    url +=
      '&scope=user.info.basic,user.info.profile,user.info.stats,video.list,video.upload';
    url += '&response_type=code';
    url += `&redirect_uri=${encodeURIComponent(CLIENT_CALLBACK)}`;
    url += '&state=' + csrfState;

    return url;
  }

  exchangeOAuthCode(code: string) {
    const url =
      this.configService.get('TIKTOK_EXCHANGE_URI') ||
      'https://open.tiktokapis.com/v2/oauth/token';

    const CLIENT_SECRET = this.configService.getOrThrow('TIKTOK_CLIENT_SECRET');
    const CLIENT_KEY = this.configService.getOrThrow('TIKTOK_CLIENT_KEY');
    const CLIENT_CALLBACK = this.configService.getOrThrow(
      'TIKTOK_CLIENT_CALLBACK',
    );

    const formData = new URLSearchParams({
      client_key: CLIENT_KEY,
      client_secret: CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: CLIENT_CALLBACK,
    });

    return this.http
      .post<TikTokExchangeCodeResponse>(url, formData, {
        headers: { ['content-type']: 'application/x-www-form-urlencoded' },
      })
      .pipe(
        map((res) => {
          if ('error' in res.data) {
            throw new Error(res.data.error_description);
          }

          return res.data;
        }),
      )
      .pipe(
        catchError((error) => {
          throw new UnauthorizedException(error?.message || error);
        }),
      );
  }
}
