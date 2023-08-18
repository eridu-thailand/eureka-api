import { Injectable } from '@nestjs/common';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { LoginDto } from './dto/login.dto';
import { firebase, firebaseAdmin } from './firebase';

@Injectable()
export class FirebaseService {
  app = firebase;
  admin = firebaseAdmin;
  auth = getAuth(firebase);

  login({ email, password }: LoginDto) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
