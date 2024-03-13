import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../../common/config/config.service';

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
    const creditCardToken = req.headers.token;
    if (!creditCardToken) {
      throw new BadRequestException('Header "token" is missing');
    }

    return this.verifyCardToken(creditCardToken);
  }

  private verifyCardToken(cardToken: string): boolean {
    try {
      const { jwtSecret } = this.configService.app;
      const validTolen = this.nestJwtService.verify(cardToken, {
        secret: jwtSecret,
      });
      return !!validTolen;
    } catch (error) {
      throw new BadRequestException('Invalid credit card token');
    }
  }
}
