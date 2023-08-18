import { Injectable } from '@nestjs/common';
import { FirebaseService } from '~/firebase/firebase.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async upsert({ userId, accessToken, refreshToken }: UserDto) {
    const userDoc = await this.firebaseService.admin
      .firestore()
      .collection('users')
      .doc(userId);

    await userDoc.set({ userId, accessToken, refreshToken });

    return (await userDoc.get()).data();
  }
}
