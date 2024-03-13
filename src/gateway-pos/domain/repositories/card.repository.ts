import { Injectable } from '@nestjs/common';
import { CreateTokenEntity } from '../entities/create-token.entity';
import { CardEntity } from '../entities/card.entity';

@Injectable()
export abstract class CardRepository {
  abstract saveCard(token: string, data: CreateTokenEntity): Promise<boolean>;
  abstract getCard(token: string): Promise<CardEntity>;
}
