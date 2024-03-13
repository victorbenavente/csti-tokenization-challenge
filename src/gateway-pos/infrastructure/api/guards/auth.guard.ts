import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const regexpPattern = new RegExp(/^pk_test_[a-zA-Z0-9]{16}$/);
    const bearerToken = req.headers.authorization?.split('Bearer')[1];
    const merchantToken = bearerToken?.trim();

    return regexpPattern.test(merchantToken);
  }
}
