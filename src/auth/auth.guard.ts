import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
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
    const { exp, user_id } = await getAuth(firebaseAdmin)
      .verifyIdToken(token)
      .catch((error) => {
        if (error.codePrefix === 'auth') {
          throw new UnauthorizedException(
            error.errorInfo?.message || error?.message || error,
          );
        }

        throw error;
      });

    request.user = { id: user_id };

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    return exp > currentTimeInSeconds;
  }
}
