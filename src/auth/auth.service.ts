import { Injectable } from '@nestjs/common';
import { FirebaseService } from '~/firebase/firebase.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async login({ email, password }: LoginDto) {
    const res = await this.firebaseService.login({ email, password });

    return res;
  }
}
