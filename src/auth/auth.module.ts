import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseModule } from '~/firebase/firebase.module';

@Module({
  imports: [ConfigModule, FirebaseModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
