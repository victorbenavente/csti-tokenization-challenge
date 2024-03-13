import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const cardToken = req.headers.token;
    this.verifyMerchantToken(cardToken);

    return true;
  }

  private verifyMerchantToken(cardToken: string): any {
    try {
      const validTolen = this.jwtService.verify(cardToken, {
        algorithms: ['HS256'],
      });
      return validTolen;
    } catch (error) {
      throw new UnauthorizedException('Invalid Merchant Token');
    }
  }
}
