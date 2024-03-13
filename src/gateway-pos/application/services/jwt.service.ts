import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ConfigService } from '../../../settings/config/config.service';
import { CreateTokenEntity } from '../../domain/entities/create-token.entity';

@Injectable()
export class JwtService {
  constructor(
    private readonly nestJwtService: NestJwtService,
    private readonly configService: ConfigService,
  ) {}

  createToken(data: CreateTokenEntity) {
    const { email, card_number } = data;
    return this.nestJwtService.sign(
      { email, card_number },
      {
        secret: this.configService.app.jwtSecret,
      },
    );
  }
}
