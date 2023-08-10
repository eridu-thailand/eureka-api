// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatusModule } from './status/status.module';
import { TikTokModule } from './tiktok/tiktok.module';

@Module({
  imports: [ConfigModule.forRoot(), StatusModule, TikTokModule],
})
export class AppModule {}
