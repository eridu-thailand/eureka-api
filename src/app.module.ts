// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatusModule } from './status/status.module';
import { TikTokModule } from './tiktok/tiktok.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StatusModule,
    TikTokModule,
    AuthModule,
    FirebaseModule,
  ],
})
export class AppModule {}
