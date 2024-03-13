import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../../settings/config/config.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly nestJwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}
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
      const { jwtSecret } = this.configService.app;
      const validTolen = this.nestJwtService.verify(cardToken, {
        algorithms: ['HS256'],
        secret: jwtSecret,
      });
      return validTolen;
    } catch (error) {
      throw new UnauthorizedException('Invalid Merchant Token');
    }
  }
}
