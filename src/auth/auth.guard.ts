import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { getAuth } from 'firebase-admin/auth';
import { firebaseAdmin } from '~/firebase/firebase';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (
      !request.headers?.authorization ||
      typeof request.headers.authorization !== 'string'
    ) {
      return false;
    }

    const token = request.headers.authorization.split(' ')[1];
    const { exp } = await getAuth(firebaseAdmin)
      .verifyIdToken(token)
      .catch(() => ({ exp: 0 }));

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    return exp > currentTimeInSeconds;
  }
}
