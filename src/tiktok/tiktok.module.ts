import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TikTokController } from './tiktok.controller';
import { TikTokService } from './tiktok.service';
import { UserModule } from '~/user/user.module';

@Module({
  imports: [ConfigModule, HttpModule, UserModule],
  controllers: [TikTokController],
  providers: [TikTokService],
})
export class TikTokModule {}
