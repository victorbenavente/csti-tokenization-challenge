import { Injectable } from '@nestjs/common';
import { CardRepository } from '../domain/repositories/card.repository';
import { JwtService } from './services/jwt.service';
import { plainToInstance } from 'class-transformer';
import { TokenEntity } from '../domain/entities/token.entity';
import { CreateTokenEntity } from '../domain/entities/create-token.entity';
import { CardEntity } from '../domain/entities/card.entity';

@Injectable()
export class CardApplication {
  constructor(
    private readonly jwtService: JwtService,
    private readonly cardRepository: CardRepository,
  ) {}

  async signIn(data: CreateTokenEntity): Promise<TokenEntity> {
    const jwt = this.jwtService.createToken(data);
    return this.cardRepository
      .saveCard(jwt, data)
      .then(() => plainToInstance(TokenEntity, { token: jwt }));
  }

  async getCardInformation(token: string): Promise<CardEntity> {
    return this.cardRepository.getCard(token);
  }
}
